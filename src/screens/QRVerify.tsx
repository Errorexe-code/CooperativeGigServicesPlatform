import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle2, Camera, X } from 'lucide-react';
import { BackHeader } from '@/components/BackHeader';
import { Avatar } from '@/components/Avatar';
import { workers, mockBooking } from '@/lib/mock-data';

const QR_PAYLOAD = JSON.stringify({
  workerId: '1',
  bookingId: mockBooking.id,
  skill: mockBooking.skill,
  issued: '2024-09-05T10:00:00Z',
  cooperative: 'SahayogCoop-BLR',
});

export function QRVerify() {
  const [tab, setTab] = useState<'mycode' | 'verify'>('mycode');
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'verified'>('idle');
  const worker = workers[0];

  const handleScan = () => {
    setScanState('scanning');
    setTimeout(() => setScanState('verified'), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <BackHeader title="QR Verification" subtitle="Identity & booking proof" />

      {/* Tabs */}
      <div className="px-4 md:px-8 pt-4 pb-3 flex-shrink-0">
        <div className="max-w-lg mx-auto">
          <div className="flex bg-stone-100 rounded-2xl p-1">
            {([
              { key: 'mycode', label: '🪪 My Code' },
              { key: 'verify', label: '📷 Verify Worker' },
            ] as const).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  tab === key ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-4 md:px-8 pb-8 scrollbar-hide">
        <div className="max-w-lg mx-auto">
        {tab === 'mycode' && (
          <div className="flex flex-col items-center gap-4">
            {/* Worker info */}
            <div className="w-full bg-white rounded-2xl p-4 border border-stone-100 flex items-center gap-3">
              <Avatar name={worker.name} initials={worker.initials} size="lg" />
              <div>
                <p className="font-semibold text-stone-900">{worker.name}</p>
                <p className="text-sm text-stone-500">{worker.skillEmoji} {worker.skill}</p>
                <p className="text-xs text-stone-400 mt-0.5">Booking {mockBooking.id}</p>
              </div>
            </div>

            {/* QR code card */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col items-center gap-4 w-full">
              <div className="p-3 bg-white rounded-2xl border-2 border-stone-100">
                <QRCodeSVG
                  value={QR_PAYLOAD}
                  size={200}
                  level="H"
                  fgColor="#1E4A3A"
                  bgColor="#ffffff"
                  style={{ display: 'block' }}
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-stone-900 text-sm">Show this QR to your customer</p>
                <p className="text-xs text-stone-400 mt-1">Valid for booking {mockBooking.id}</p>
              </div>
              <div className="w-full flex items-center gap-2 p-3 bg-brand-light rounded-xl">
                <CheckCircle2 size={16} className="text-brand flex-shrink-0" />
                <p className="text-xs text-brand font-medium">Verified cooperative member · Sahayog Coop BLR</p>
              </div>
            </div>

            {/* Instructions */}
            <div className="w-full bg-amber-light rounded-2xl p-4">
              <p className="text-sm font-semibold text-amber-900 mb-1">How it works</p>
              <ol className="text-xs text-amber-800 space-y-1 list-decimal list-inside leading-relaxed">
                <li>Open this screen before meeting the customer</li>
                <li>Ask them to scan the QR code to verify your identity</li>
                <li>The app confirms your booking details and cooperative membership</li>
              </ol>
            </div>
          </div>
        )}

        {tab === 'verify' && (
          <div className="flex flex-col items-center gap-4">
            {scanState === 'verified' ? (
              <div className="w-full flex flex-col items-center gap-4 py-4">
                <div className="w-20 h-20 rounded-full bg-brand flex items-center justify-center shadow-lg">
                  <CheckCircle2 size={36} className="text-white" />
                </div>
                <div className="text-center">
                  <h2 className="font-display text-2xl font-semibold text-stone-900">Worker verified!</h2>
                  <p className="text-stone-500 text-sm mt-1">This is a verified cooperative member</p>
                </div>
                <div className="w-full bg-white rounded-2xl border border-stone-100 divide-y divide-stone-50">
                  {[
                    { label: 'Worker name', value: worker.name },
                    { label: 'Skill', value: `${worker.skillEmoji} ${worker.skill}` },
                    { label: 'Booking ID', value: mockBooking.id },
                    { label: 'Cooperative', value: 'Sahayog Coop BLR' },
                    { label: 'Community vouches', value: `${worker.vouches} people` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center px-4 py-3">
                      <span className="text-sm text-stone-500">{label}</span>
                      <span className="text-sm font-semibold text-stone-900">{value}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setScanState('idle')}
                  className="w-full py-3 rounded-2xl border border-stone-200 text-stone-600 text-sm font-medium flex items-center justify-center gap-2 active:bg-stone-50"
                >
                  <X size={14} />
                  Scan another
                </button>
              </div>
            ) : (
              <>
                {/* Camera viewfinder */}
                <div className="w-full aspect-square max-h-72 bg-stone-900 rounded-3xl overflow-hidden relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 to-stone-900/60" />
                  {scanState === 'scanning' ? (
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full border-4 border-white/40 border-t-white animate-spin" />
                      <p className="text-white text-sm font-medium">Scanning QR code…</p>
                    </div>
                  ) : (
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      {/* Corner markers */}
                      <div className="absolute -top-12 -left-12 w-24 h-24 border-t-4 border-l-4 border-white rounded-tl-lg" />
                      <div className="absolute -top-12 -right-12 w-24 h-24 border-t-4 border-r-4 border-white rounded-tr-lg" />
                      <div className="absolute -bottom-12 -left-12 w-24 h-24 border-b-4 border-l-4 border-white rounded-bl-lg" />
                      <div className="absolute -bottom-12 -right-12 w-24 h-24 border-b-4 border-r-4 border-white rounded-br-lg" />
                      <Camera size={32} className="text-white/70" />
                      <p className="text-white/70 text-xs">Point camera at worker's QR code</p>
                    </div>
                  )}
                  {/* Scan line animation */}
                  {scanState === 'scanning' && (
                    <div className="absolute inset-x-0 h-0.5 bg-brand/80 animate-bounce top-1/2 z-20" />
                  )}
                </div>

                <button
                  onClick={handleScan}
                  disabled={scanState === 'scanning'}
                  className="w-full py-4 rounded-2xl bg-brand text-white font-semibold text-base flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-60"
                >
                  <Camera size={18} />
                  {scanState === 'scanning' ? 'Scanning...' : 'Tap to scan QR code'}
                </button>

                <p className="text-center text-xs text-stone-400">
                  Ask the worker to show their QR code from their profile
                </p>
              </>
            )}
          </div>
        )}
        </div>
      </main>
    </div>
  );
}
