import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import type { Language } from '@/lib/language-context';

interface Props {
  onSelect: (lang: Language) => void;
}

const LANGUAGES: { code: Language; name: string; native: string; script: string }[] = [
  { code: 'en', name: 'English', native: 'English', script: 'Continue in English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी', script: 'हिंदी में जारी रखें' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', script: 'मराठीत पुढे जा' },
];

export function LanguageScreen({ onSelect }: Props) {
  const [selected, setSelected] = useState<Language | null>(null);

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm flex flex-col items-center">

        {/* Logo mark */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-20 h-20 rounded-3xl bg-brand flex items-center justify-center shadow-lg mb-4">
            <span className="text-4xl">🤝</span>
          </div>
          <h1 className="font-display text-3xl font-semibold text-stone-900 tracking-tight">Sahayog</h1>
          <p className="text-sm text-stone-500 mt-1">Cooperative Gig Services</p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-stone-200 mb-8" />

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="font-display text-xl font-semibold text-stone-900 mb-1">Choose your language</h2>
          <p className="text-sm text-stone-500">अपनी भाषा चुनें · आपली भाषा निवडा</p>
        </div>

        {/* Language cards */}
        <div className="w-full space-y-3 mb-8">
          {LANGUAGES.map((lang) => {
            const active = selected === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setSelected(lang.code)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.99] ${
                  active
                    ? 'border-brand bg-brand-light'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg font-bold ${
                  active ? 'bg-brand text-white' : 'bg-stone-100 text-stone-600'
                }`}>
                  {lang.native[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-base leading-tight ${active ? 'text-brand' : 'text-stone-900'}`}>
                    {lang.native}
                  </p>
                  <p className={`text-xs mt-0.5 ${active ? 'text-brand/70' : 'text-stone-400'}`}>
                    {lang.name}
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  active ? 'border-brand bg-brand' : 'border-stone-300'
                }`}>
                  {active && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Continue button */}
        <button
          disabled={!selected}
          onClick={() => selected && onSelect(selected)}
          className="w-full py-4 rounded-2xl bg-brand text-white font-semibold text-base flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight size={18} strokeWidth={2.5} />
        </button>

        <p className="text-xs text-stone-400 mt-5 text-center">
          Sahayog Cooperative Society · Bengaluru
        </p>
      </div>
    </div>
  );
}
