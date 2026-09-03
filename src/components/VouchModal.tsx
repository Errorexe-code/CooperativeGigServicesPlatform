import { useState } from 'react';
import { X, ShieldCheck, Check } from 'lucide-react';
import { Avatar } from './Avatar';
import type { Worker } from '@/lib/mock-data';

interface VouchModalProps {
  worker: Worker;
  onClose: () => void;
}

export function VouchModal({ worker, onClose }: VouchModalProps) {
  const [step, setStep] = useState<'confirm' | 'done'>('confirm');

  const handleVouch = () => {
    setTimeout(() => setStep('done'), 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-[420px] bg-white rounded-t-3xl p-6 pb-10 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 active:bg-stone-200"
        >
          <X size={16} />
        </button>

        {step === 'confirm' ? (
          <>
            <div className="flex flex-col items-center text-center pt-2">
              <div className="w-12 h-12 rounded-full bg-brand-muted flex items-center justify-center mb-4">
                <ShieldCheck size={24} className="text-brand" />
              </div>
              <h2 className="font-display text-xl font-semibold text-stone-900 mb-1">
                Vouch for {worker.name}?
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed">
                By vouching, you're telling the community that you trust {worker.name}'s work and character. Your name
                will appear on their profile.
              </p>
            </div>

            <div className="flex items-center gap-3 mt-6 p-4 bg-stone-50 rounded-2xl">
              <Avatar name={worker.name} initials={worker.initials} size="md" />
              <div>
                <p className="font-semibold text-stone-900 text-sm">{worker.name}</p>
                <p className="text-xs text-stone-500">
                  {worker.skillEmoji} {worker.skill} · {worker.vouches} vouches
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl border border-stone-200 text-stone-600 font-medium text-sm active:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={handleVouch}
                className="flex-1 py-3 rounded-2xl bg-brand text-white font-semibold text-sm active:scale-95 transition-transform"
              >
                Yes, I vouch
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center mb-4 animate-bounce">
              <Check size={28} className="text-white" strokeWidth={3} />
            </div>
            <h2 className="font-display text-xl font-semibold text-stone-900 mb-2">Vouch submitted!</h2>
            <p className="text-stone-500 text-sm">
              Your vouch for {worker.name} has been recorded. The community thanks you.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-8 py-3 rounded-2xl bg-brand text-white font-semibold text-sm active:scale-95 transition-transform"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
