import { useState } from 'react';
import { MapPin, Check } from 'lucide-react';
import { BackHeader } from '@/components/BackHeader';
import { workers } from '@/lib/mock-data';

const worker = workers[0];

export function RadiusSetting() {
  const [radius, setRadius] = useState(worker.radius);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const estimatedJobs = Math.round(3 + radius * 1.8);

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <BackHeader title="Service radius" subtitle="Control where you get job requests" />

      <main className="flex-1 overflow-y-auto px-4 md:px-8 pt-4 pb-32 scrollbar-hide">
        <div className="max-w-2xl mx-auto space-y-5">
        {/* Map placeholder with radius overlay */}
        <div className="relative bg-stone-200 rounded-3xl overflow-hidden aspect-video flex items-center justify-center">
          {/* Fake map grid */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={`h${i}`} className="absolute w-full h-px bg-stone-500" style={{ top: `${(i + 1) * 12}%` }} />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`v${i}`}
                className="absolute h-full w-px bg-stone-500"
                style={{ left: `${(i + 1) * 10}%` }}
              />
            ))}
          </div>

          {/* Road lines (decorative) */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-[38%] left-0 right-0 h-2 bg-stone-50 rounded-full" />
            <div className="absolute top-0 bottom-0 left-[42%] w-2 bg-stone-50 rounded-full" />
          </div>

          {/* Radius circles */}
          {[1, 0.7, 0.45].map((scale, i) => (
            <div
              key={i}
              className="absolute rounded-full border-2 transition-all duration-300"
              style={{
                width: `${radius * scale * 8 + 10}%`,
                height: `${radius * scale * 8 + 10}%`,
                borderColor: i === 0 ? '#2F6B57' : '#2F6B5740',
                backgroundColor: i === 0 ? '#2F6B5708' : 'transparent',
              }}
            />
          ))}

          {/* Center pin */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-brand border-2 border-white shadow-lg flex items-center justify-center">
              <MapPin size={14} className="text-white" />
            </div>
            <div className="w-2 h-2 bg-brand/30 rounded-full mt-0.5" />
          </div>

          {/* Radius label on map */}
          <div
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl px-2.5 py-1.5 shadow-sm"
          >
            <p className="text-xs font-bold text-brand">{radius} km radius</p>
          </div>
        </div>

        {/* Radius control */}
        <div className="bg-white rounded-2xl p-5 border border-stone-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold text-stone-900 text-sm">Service radius</p>
              <p className="text-xs text-stone-500 mt-0.5">Workers in this range can see your requests</p>
            </div>
            <div className="text-right">
              <p className="font-display text-3xl font-semibold text-brand">{radius}</p>
              <p className="text-xs text-stone-500">km</p>
            </div>
          </div>

          <input
            type="range"
            min={1}
            max={20}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full"
          />

          <div className="flex justify-between text-xs text-stone-400 mt-2">
            <span>1 km</span>
            <span>10 km</span>
            <span>20 km</span>
          </div>
        </div>

        {/* Estimated impact */}
        <div className="bg-brand-light rounded-2xl p-4 border border-brand/10">
          <p className="text-xs font-semibold text-brand uppercase tracking-wide mb-2">Estimated reach</p>
          <div className="flex items-end gap-2">
            <p className="font-display text-3xl font-semibold text-brand">~{estimatedJobs}</p>
            <p className="text-sm text-brand mb-1">job requests / month</p>
          </div>
          <p className="text-xs text-brand mt-1">
            Based on average demand in Koramangala area for {worker.skill.toLowerCase()} services
          </p>
        </div>

        {/* Recommendations */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide px-1">Quick presets</p>
          {[
            { label: 'Hyperlocal', km: 2, desc: 'Your street & immediate neighbors' },
            { label: 'Neighborhood', km: 5, desc: 'Your area and nearby localities' },
            { label: 'City-wide', km: 15, desc: 'Cover most of Bangalore' },
          ].map(({ label, km, desc }) => (
            <button
              key={km}
              onClick={() => setRadius(km)}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all active:scale-98 text-left ${
                radius === km ? 'border-brand bg-brand-light' : 'border-stone-200 bg-white'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                  radius === km ? 'bg-brand text-white' : 'bg-stone-100 text-stone-600'
                }`}
              >
                {km}km
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${radius === km ? 'text-brand' : 'text-stone-900'}`}>{label}</p>
                <p className="text-xs text-stone-500 mt-0.5">{desc}</p>
              </div>
              {radius === km && <Check size={16} className="text-brand flex-shrink-0" />}
            </button>
          ))}
        </div>
        </div>
      </main>

      {/* Save button */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 p-4 bg-white border-t border-stone-100">
        <button
          onClick={handleSave}
          className={`w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 active:scale-95 transition-all ${
            saved ? 'bg-emerald-500 text-white' : 'bg-brand text-white'
          }`}
        >
          {saved ? (
            <>
              <Check size={18} strokeWidth={3} />
              Radius saved!
            </>
          ) : (
            `Save — ${radius} km radius`
          )}
        </button>
      </div>
    </div>
  );
}
