import { useState } from 'react';
import { X, RotateCcw, Star, ChevronUp, ChevronDown } from 'lucide-react';
import { services } from '@/lib/mock-data';

export interface FilterState {
  skills: string[];
  maxDistance: number;
  minRating: number;
  minVouches: number;
  availableNow: boolean;
}

export const DEFAULT_FILTERS: FilterState = {
  skills: [],
  maxDistance: 20,
  minRating: 0,
  minVouches: 0,
  availableNow: false,
};

export function activeFilterCount(f: FilterState): number {
  return [
    f.skills.length > 0,
    f.maxDistance < 20,
    f.minRating > 0,
    f.minVouches > 0,
    f.availableNow,
  ].filter(Boolean).length;
}

const RATING_OPTIONS = [
  { value: 0, label: 'Any' },
  { value: 3, label: '3+' },
  { value: 4, label: '4+' },
  { value: 4.5, label: '4.5+' },
];

const VOUCH_OPTIONS = [
  { value: 0, label: 'Any' },
  { value: 1, label: '1+' },
  { value: 3, label: '3+' },
  { value: 5, label: '5+' },
  { value: 10, label: '10+' },
];

interface Props {
  initial: FilterState;
  onApply: (f: FilterState) => void;
  onClose: () => void;
}

export function FilterSheet({ initial, onApply, onClose }: Props) {
  const [draft, setDraft] = useState<FilterState>({ ...initial });

  const toggle = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const toggleSkill = (skillId: string) =>
    setDraft((d) => ({
      ...d,
      skills: d.skills.includes(skillId)
        ? d.skills.filter((s) => s !== skillId)
        : [...d.skills, skillId],
    }));

  const reset = () => setDraft({ ...DEFAULT_FILTERS });

  const handleApply = () => {
    onApply(draft);
    onClose();
  };

  const count = activeFilterCount(draft);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-lg bg-white rounded-t-3xl shadow-xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-stone-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl font-semibold text-stone-900">Filters</h2>
            {count > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-brand text-white text-xs font-bold">{count}</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {count > 0 && (
              <button onClick={reset} className="flex items-center gap-1.5 text-sm text-stone-500 font-medium active:opacity-70">
                <RotateCcw size={13} /> Reset
              </button>
            )}
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center active:bg-stone-200">
              <X size={16} className="text-stone-500" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-7 scrollbar-hide">

          {/* 1. Skill category */}
          <section>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-3">Skill category</p>
            <div className="grid grid-cols-3 gap-2">
              {services.map((s) => {
                const active = draft.skills.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleSkill(s.id)}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl border-2 transition-all active:scale-95 text-center ${
                      active ? 'border-brand bg-brand-light' : 'border-stone-200 bg-white'
                    }`}
                  >
                    <span className="text-xl">{s.emoji}</span>
                    <span className={`text-xs font-semibold leading-tight ${active ? 'text-brand' : 'text-stone-600'}`}>
                      {s.name}
                    </span>
                  </button>
                );
              })}
            </div>
            {draft.skills.length > 0 && (
              <button onClick={() => setDraft((d) => ({ ...d, skills: [] }))} className="mt-2 text-xs text-stone-400 font-medium active:opacity-70">
                Clear selection
              </button>
            )}
          </section>

          {/* 2. Distance */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wide">Max distance</p>
              <span className="font-display text-lg font-semibold text-brand">{draft.maxDistance} km</span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              step={1}
              value={draft.maxDistance}
              onChange={(e) => toggle('maxDistance', Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-stone-400 mt-1.5">
              <span>1 km</span>
              <span>10 km</span>
              <span>20 km</span>
            </div>
          </section>

          {/* 3. Minimum rating */}
          <section>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-3">Minimum rating</p>
            <div className="flex gap-2">
              {RATING_OPTIONS.map((opt) => {
                const active = draft.minRating === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => toggle('minRating', opt.value)}
                    className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl border-2 transition-all active:scale-95 ${
                      active ? 'border-brand bg-brand-light' : 'border-stone-200 bg-white'
                    }`}
                  >
                    {opt.value > 0 && <Star size={14} fill="#F2B94B" className="text-amber-400" />}
                    <span className={`text-sm font-bold ${active ? 'text-brand' : 'text-stone-700'}`}>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 4. Minimum vouches */}
          <section>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-3">Minimum vouches</p>
            <div className="flex gap-2 flex-wrap">
              {VOUCH_OPTIONS.map((opt) => {
                const active = draft.minVouches === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => toggle('minVouches', opt.value)}
                    className={`px-4 py-2.5 rounded-2xl border-2 text-sm font-semibold transition-all active:scale-95 ${
                      active ? 'border-brand bg-brand-light text-brand' : 'border-stone-200 bg-white text-stone-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 5. Available now */}
          <section>
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-stone-200">
              <div>
                <p className="font-semibold text-stone-900 text-sm">Available now</p>
                <p className="text-xs text-stone-400 mt-0.5">Only show workers ready for immediate booking</p>
              </div>
              <button
                onClick={() => toggle('availableNow', !draft.availableNow)}
                className={`w-12 h-7 rounded-full transition-colors relative flex-shrink-0 ml-4 ${draft.availableNow ? 'bg-brand' : 'bg-stone-200'}`}
              >
                <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${draft.availableNow ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-100 flex-shrink-0 flex gap-3">
          <button
            onClick={reset}
            className="px-5 py-3.5 rounded-2xl border border-stone-200 text-stone-600 font-medium text-sm active:bg-stone-50 hover:bg-stone-50 transition-colors"
          >
            Clear all
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-3.5 rounded-2xl bg-brand text-white font-semibold text-sm active:scale-95 transition-transform"
          >
            Apply filters{count > 0 ? ` (${count})` : ''}
          </button>
        </div>
      </div>
    </div>
  );
}
