import { useState } from 'react';
import { ArrowLeft, ArrowRight, Camera, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { services } from '@/lib/mock-data';
import { useRole } from '@/lib/role-context';

const STEPS = ['Personal', 'Skills', 'Verify'];

export function WorkerOnboarding() {
  const navigate = useNavigate();
  const { setRole, setIsWorker } = useRole();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', skill: '', location: '', hasPhoto: false });
  const [submitted, setSubmitted] = useState(false);

  const update = (key: string, val: string | boolean) => setForm((f) => ({ ...f, [key]: val }));

  const canProceed = () => {
    if (step === 0) return form.name.trim().length > 1 && form.phone.length === 10;
    if (step === 1) return form.skill && form.location.trim().length > 2;
    return form.hasPhoto;
  };

  const handleNext = () => {
    if (step < 2) {
      setStep((s) => s + 1);
    } else {
      setIsWorker(true);
      setRole('worker');
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-cream px-6 text-center">
        <div className="max-w-sm w-full">
          <div className="w-20 h-20 rounded-full bg-brand flex items-center justify-center mb-6 shadow-lg mx-auto">
            <Check size={36} className="text-white" strokeWidth={3} />
          </div>
          <h1 className="font-display text-2xl font-semibold text-stone-900 mb-2">You're on the list!</h1>
          <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto">
            Welcome to the cooperative, {form.name.split(' ')[0]}. Once 3 community members vouch for you, your profile goes live.
          </p>
          <div className="mt-6 p-4 bg-white rounded-2xl border border-stone-100 w-full text-left">
            <p className="text-xs text-stone-500 mb-1 font-medium uppercase tracking-wide">Next steps</p>
            {['Ask neighbors to vouch for you', 'Set your service radius', 'Complete your profile photo'].map((s, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-stone-50 last:border-0">
                <div className="w-5 h-5 rounded-full border-2 border-brand flex items-center justify-center">
                  <span className="text-brand text-xs font-bold">{i + 1}</span>
                </div>
                <span className="text-sm text-stone-700">{s}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/')}
            className="mt-6 w-full py-3.5 bg-brand text-white rounded-2xl font-semibold text-sm active:scale-95 transition-transform"
          >
            Go to my worker dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 md:px-8 py-3.5 sticky top-0 bg-cream z-10">
        <button
          onClick={() => (step > 0 ? setStep((s) => s - 1) : navigate(-1))}
          className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center active:bg-stone-50"
        >
          <ArrowLeft size={18} className="text-stone-700" />
        </button>
        <div className="flex-1">
          <p className="text-xs text-stone-500 font-medium">Step {step + 1} of {STEPS.length}</p>
          <h1 className="font-semibold text-stone-900">Join the cooperative</h1>
        </div>
      </header>

      {/* Progress bar */}
      <div className="px-4 md:px-8 pb-4">
        <div className="max-w-lg mx-auto">
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= step ? 'bg-brand' : 'bg-stone-200'}`} />
            ))}
          </div>
          <div className="flex mt-2">
            {STEPS.map((label, i) => (
              <div key={i} className="flex-1 text-center">
                <span className={`text-[10px] font-medium ${i <= step ? 'text-brand' : 'text-stone-400'}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form content */}
      <main className="flex-1 overflow-y-auto px-4 md:px-8 pb-32 scrollbar-hide">
        <div className="max-w-lg mx-auto">
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-2xl font-semibold text-stone-900 mb-1">Tell us about you</h2>
                <p className="text-stone-500 text-sm">Your name and phone number to get started.</p>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5 block">Full name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ravi Kumar"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl border border-stone-200 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5 block">Phone number</label>
                  <div className="flex gap-2">
                    <div className="px-4 py-3.5 rounded-2xl border border-stone-200 bg-white text-stone-700 text-sm font-medium">+91</div>
                    <input
                      type="tel"
                      placeholder="98765 43210"
                      maxLength={10}
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value.replace(/\D/g, ''))}
                      className="flex-1 px-4 py-3.5 rounded-2xl border border-stone-200 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 text-sm"
                    />
                  </div>
                  <p className="text-xs text-stone-400 mt-1.5 px-1">We'll send a one-time verification code</p>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-2xl font-semibold text-stone-900 mb-1">Your skills & area</h2>
                <p className="text-stone-500 text-sm">Where you work and what you're best at.</p>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-2 block">Skill category</label>
                  <div className="grid grid-cols-3 gap-2">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => update('skill', s.name)}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all text-center active:scale-95 ${
                          form.skill === s.name ? 'border-brand bg-brand-light' : 'border-stone-200 bg-white'
                        }`}
                      >
                        <span className="text-xl">{s.emoji}</span>
                        <span className={`text-xs font-medium leading-tight ${form.skill === s.name ? 'text-brand' : 'text-stone-600'}`}>
                          {s.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5 block">Your area / locality</label>
                  <input
                    type="text"
                    placeholder="e.g. Koramangala, Bangalore"
                    value={form.location}
                    onChange={(e) => update('location', e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl border border-stone-200 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-2xl font-semibold text-stone-900 mb-1">Add a photo</h2>
                <p className="text-stone-500 text-sm">Workers with photos get 3× more bookings. Your neighbors will recognize you.</p>
              </div>
              <button
                onClick={() => update('hasPhoto', !form.hasPhoto)}
                className={`w-full aspect-square max-h-64 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all active:scale-98 ${
                  form.hasPhoto ? 'border-brand bg-brand-light' : 'border-stone-300 bg-white'
                }`}
              >
                {form.hasPhoto ? (
                  <>
                    <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center">
                      <Check size={24} className="text-white" strokeWidth={3} />
                    </div>
                    <p className="text-brand font-semibold text-sm">Photo added!</p>
                    <p className="text-stone-400 text-xs">Tap to change</p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center">
                      <Camera size={24} className="text-stone-400" />
                    </div>
                    <p className="text-stone-700 font-semibold text-sm">Tap to upload photo</p>
                    <p className="text-stone-400 text-xs">JPG or PNG, max 5 MB</p>
                  </>
                )}
              </button>

              <div className="p-4 bg-amber-light rounded-2xl flex gap-3">
                <span className="text-lg">💡</span>
                <p className="text-sm text-amber-900 leading-relaxed">
                  You can also skip this step and add a photo later from your profile.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 p-4 bg-cream border-t border-stone-100">
        <div className="max-w-lg mx-auto">
          <button
            onClick={handleNext}
            disabled={!canProceed() && step !== 2}
            className="w-full py-4 rounded-2xl bg-brand text-white font-semibold text-base flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {step === 2 ? 'Submit & join' : 'Continue'}
            {step < 2 && <ArrowRight size={18} strokeWidth={2.5} />}
          </button>
          {step === 2 && (
            <button onClick={handleNext} className="w-full mt-3 py-2 text-stone-500 text-sm font-medium active:opacity-70">
              Skip photo for now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
