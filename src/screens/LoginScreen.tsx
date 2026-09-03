import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { AlternativeAuth } from '@/components/AlternativeAuth';

type UserType = 'customer' | 'worker';
type LoginStage = 'phone' | 'otp' | 'done';

interface Props {
  onSuccess: (userType: UserType, isNewUser: boolean) => void;
}

const LABELS: Record<string, Record<string, string>> = {
  en: {
    title: 'Welcome back',
    subtitle: 'Sign in with your phone number',
    customer: 'Customer',
    worker: 'Worker',
    phoneLabel: 'Phone number',
    phonePlaceholder: '98765 43210',
    phoneHint: "We'll send a one-time verification code",
    sendOtp: 'Send OTP',
    otpTitle: 'Enter OTP',
    otpHint: 'Enter the 6-digit code sent to',
    otpPlaceholder: '_ _ _ _ _ _',
    verify: 'Verify & continue',
    resend: 'Resend code',
    newUser: 'New user',
    returningUser: 'Returning user',
    demoNote: 'Demo: any 6-digit code works',
    changeNumber: 'Change number',
  },
  hi: {
    title: 'वापस आपका स्वागत है',
    subtitle: 'अपने फ़ोन नंबर से साइन इन करें',
    customer: 'ग्राहक',
    worker: 'कर्मी',
    phoneLabel: 'फ़ोन नंबर',
    phonePlaceholder: '98765 43210',
    phoneHint: 'हम एक OTP भेजेंगे',
    sendOtp: 'OTP भेजें',
    otpTitle: 'OTP दर्ज करें',
    otpHint: 'यह कोड इस नंबर पर भेजा गया है',
    otpPlaceholder: '_ _ _ _ _ _',
    verify: 'जारी रखें',
    resend: 'OTP फिर भेजें',
    newUser: 'नया उपयोगकर्ता',
    returningUser: 'मौजूदा उपयोगकर्ता',
    demoNote: 'डेमो: कोई भी 6 अंक काम करेंगे',
    changeNumber: 'नंबर बदलें',
  },
  mr: {
    title: 'परत स्वागत आहे',
    subtitle: 'तुमच्या फोन नंबरने साइन इन करा',
    customer: 'ग्राहक',
    worker: 'कामगार',
    phoneLabel: 'फोन नंबर',
    phonePlaceholder: '98765 43210',
    phoneHint: 'आम्ही एक OTP पाठवू',
    sendOtp: 'OTP पाठवा',
    otpTitle: 'OTP टाका',
    otpHint: 'हा कोड या नंबरवर पाठवला गेला',
    otpPlaceholder: '_ _ _ _ _ _',
    verify: 'पुढे जा',
    resend: 'OTP पुन्हा पाठवा',
    newUser: 'नवीन वापरकर्ता',
    returningUser: 'जुना वापरकर्ता',
    demoNote: 'डेमो: कोणतेही 6 अंक चालतील',
    changeNumber: 'नंबर बदला',
  },
};

export function LoginScreen({ onSuccess }: Props) {
  const { language } = useLanguage();
  const t = LABELS[language] ?? LABELS.en;

  const [userType, setUserType] = useState<UserType>('customer');
  const [isNewUser, setIsNewUser] = useState(false);
  const [phone, setPhone] = useState('');
  const [stage, setStage] = useState<LoginStage>('phone');
  const [sending, setSending] = useState(false);
  const [otp, setOtp] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const otpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (stage === 'otp') {
      setTimeout(() => otpRef.current?.focus(), 100);
    }
  }, [stage]);

  const handleSendOtp = () => {
    if (phone.length < 10) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setStage('otp');
    }, 1400);
  };

  const handleVerify = () => {
    if (otp.length < 4) return;
    setOtpError(false);
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      onSuccess(userType, isNewUser);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Top area */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-brand flex items-center justify-center">
          <span className="text-xl">🤝</span>
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-stone-900 leading-tight">Sahayog</p>
          <p className="text-xs text-stone-400">Cooperative Gig Services</p>
        </div>
      </div>

      <main className="flex-1 flex flex-col px-5 pt-4">
        <div className="max-w-sm w-full mx-auto flex flex-col flex-1">

          {/* User type toggle */}
          <div className="bg-stone-100 rounded-2xl p-1 flex mb-6">
            {(['customer', 'worker'] as UserType[]).map((type) => (
              <button
                key={type}
                onClick={() => setUserType(type)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${
                  userType === type ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                }`}
              >
                {type === 'customer' ? t.customer : t.worker}
              </button>
            ))}
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="font-display text-2xl font-semibold text-stone-900 leading-tight">{t.title}</h1>
            <p className="text-stone-500 text-sm mt-1">{t.subtitle}</p>
          </div>

          {stage === 'phone' && (
            <div className="space-y-5">
              {/* Phone input */}
              <div>
                <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5 block">
                  {t.phoneLabel}
                </label>
                <div className="flex gap-2">
                  <div className="px-4 py-3.5 rounded-2xl border border-stone-200 bg-white text-stone-700 text-sm font-medium flex-shrink-0">
                    +91
                  </div>
                  <input
                    type="tel"
                    placeholder={t.phonePlaceholder}
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    onKeyDown={(e) => e.key === 'Enter' && phone.length === 10 && handleSendOtp()}
                    className="flex-1 px-4 py-3.5 rounded-2xl border border-stone-200 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 text-sm"
                  />
                </div>
                <p className="text-xs text-stone-400 mt-1.5 px-1">{t.phoneHint}</p>
              </div>

              {/* New / Returning toggle */}
              <div className="flex items-center gap-2 bg-white rounded-2xl border border-stone-200 p-1">
                {[false, true].map((newU) => (
                  <button
                    key={String(newU)}
                    onClick={() => setIsNewUser(newU)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isNewUser === newU ? 'bg-amber-light text-amber-700 border border-amber-warm/30' : 'text-stone-400'
                    }`}
                  >
                    {newU ? t.newUser : t.returningUser}
                  </button>
                ))}
              </div>

              <button
                disabled={phone.length < 10 || sending}
                onClick={handleSendOtp}
                className="w-full py-4 rounded-2xl bg-brand text-white font-semibold text-base flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    {t.sendOtp}
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </div>
          )}

          {stage === 'otp' && (
            <div className="space-y-5">
              {/* Back + phone display */}
              <button
                onClick={() => { setStage('phone'); setOtp(''); setOtpError(false); }}
                className="flex items-center gap-1.5 text-stone-500 text-sm -ml-1"
              >
                <ArrowLeft size={15} />
                {t.changeNumber}
              </button>

              <div className="bg-brand-light rounded-2xl p-4 flex items-center gap-3">
                <CheckCircle2 size={18} className="text-brand flex-shrink-0" />
                <p className="text-sm text-brand">
                  {t.otpHint}{' '}
                  <span className="font-semibold">+91 {phone}</span>
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-stone-900 mb-1">{t.otpTitle}</h2>
                <p className="text-xs text-stone-400 mb-4">{t.demoNote}</p>
                <input
                  ref={otpRef}
                  type="tel"
                  placeholder="_ _ _ _ _ _"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, ''));
                    setOtpError(false);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && otp.length >= 4 && handleVerify()}
                  className={`w-full px-4 py-4 rounded-2xl border-2 bg-white text-stone-900 text-center text-2xl font-bold tracking-[0.5em] placeholder-stone-300 focus:outline-none transition-colors ${
                    otpError ? 'border-red-400 focus:border-red-400' : 'border-stone-200 focus:border-brand focus:ring-2 focus:ring-brand/10'
                  }`}
                />
                {otpError && (
                  <p className="text-xs text-red-500 mt-1.5 px-1">Incorrect code. Please try again.</p>
                )}
              </div>

              <button
                disabled={otp.length < 4 || verifying}
                onClick={handleVerify}
                className="w-full py-4 rounded-2xl bg-brand text-white font-semibold text-base flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {verifying ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Verifying…
                  </>
                ) : (
                  <>
                    {t.verify}
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </>
                )}
              </button>

              <button className="w-full py-2 text-stone-400 text-sm font-medium active:opacity-70">
                {t.resend}
              </button>
            </div>
          )}

          {/* Alternative auth methods — only on phone input step */}
          {stage === 'phone' && (
            <AlternativeAuth
              onSuccess={onSuccess}
              userType={userType}
              isNewUser={isNewUser}
            />
          )}

          {/* Cooperative note */}
          <div className="mt-auto pt-8 pb-6">
            <p className="text-xs text-stone-400 text-center leading-relaxed">
              By continuing, you agree to the{' '}
              <span className="text-brand font-medium">Terms of Service</span> and{' '}
              <span className="text-brand font-medium">Cooperative Rules</span>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
