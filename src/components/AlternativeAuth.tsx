import { useState, useRef, useEffect } from 'react';
import { Mail, Eye, EyeOff, Loader2, CheckCircle2, ScanFace, AlertCircle, ArrowLeft } from 'lucide-react';

type UserType = 'customer' | 'worker';
type AltMethod = 'google' | 'email' | 'face' | null;

interface Props {
  userType: UserType;
  isNewUser: boolean;
  onSuccess: (userType: UserType, isNewUser: boolean) => void;
}

/* ── Google SVG logo ─────────────────────────────────────── */
function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.29-8.16 2.29-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      <path fill="none" d="M0 0h48v48H0z"/>
    </svg>
  );
}

/* ── Email/Password form ─────────────────────────────────── */
function EmailForm({ onSuccess, userType, isNewUser, onBack }: {
  onSuccess: Props['onSuccess'];
  userType: UserType;
  isNewUser: boolean;
  onBack: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email address';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => onSuccess(userType, isNewUser), 1200);
  };

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="flex items-center gap-1.5 text-stone-500 text-sm -ml-1">
        <ArrowLeft size={15} /> Other sign-in options
      </button>

      <div>
        <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5 block">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
          className={`w-full px-4 py-3.5 rounded-2xl border bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 text-sm transition-colors ${
            errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400/10' : 'border-stone-200 focus:border-brand focus:ring-brand/10'
          }`}
        />
        {errors.email && (
          <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 px-1">
            <AlertCircle size={12} /> {errors.email}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5 block">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className={`w-full px-4 py-3.5 pr-12 rounded-2xl border bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 text-sm transition-colors ${
              errors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-400/10' : 'border-stone-200 focus:border-brand focus:ring-brand/10'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
        {errors.password && (
          <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 px-1">
            <AlertCircle size={12} /> {errors.password}
          </p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-4 rounded-2xl bg-brand text-white font-semibold text-base flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-60"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : null}
        {loading ? 'Signing in…' : 'Sign in with email'}
      </button>
    </div>
  );
}

/* ── Face Verification ───────────────────────────────────── */
type FaceState = 'preview' | 'scanning' | 'success' | 'denied';

function FaceVerify({ onSuccess, userType, isNewUser, onBack }: {
  onSuccess: Props['onSuccess'];
  userType: UserType;
  isNewUser: boolean;
  onBack: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [faceState, setFaceState] = useState<FaceState>('preview');

  useEffect(() => {
    let active = true;
    navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'user' }, audio: false })
      .then((stream) => {
        if (!active) { stream.getTracks().forEach((t) => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      })
      .catch(() => { if (active) setFaceState('denied'); });

    return () => {
      active = false;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const handleScan = () => {
    setFaceState('scanning');
    setTimeout(() => {
      setFaceState('success');
      streamRef.current?.getTracks().forEach((t) => t.stop());
      setTimeout(() => onSuccess(userType, isNewUser), 900);
    }, 1600);
  };

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="flex items-center gap-1.5 text-stone-500 text-sm -ml-1">
        <ArrowLeft size={15} /> Other sign-in options
      </button>

      <div>
        <p className="font-display text-lg font-semibold text-stone-900 mb-0.5">Face verification</p>
        <p className="text-sm text-stone-500">Position your face in the frame and tap Scan.</p>
      </div>

      {/* Camera frame */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 aspect-[3/4] w-full max-h-72 flex items-center justify-center">
        {faceState !== 'denied' && (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover scale-x-[-1]"
          />
        )}

        {/* Face oval guide */}
        {(faceState === 'preview' || faceState === 'scanning') && (
          <div className={`absolute inset-0 flex items-center justify-center pointer-events-none`}>
            <div className={`w-36 h-48 rounded-full border-4 transition-colors duration-300 ${
              faceState === 'scanning' ? 'border-amber-warm' : 'border-white/60'
            }`} />
          </div>
        )}

        {/* Scanning sweep */}
        {faceState === 'scanning' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            <div
              className="absolute left-0 right-0 h-1 bg-amber-warm/60 blur-sm"
              style={{ animation: 'scanSweep 1.6s ease-in-out forwards' }}
            />
          </div>
        )}

        {/* Success overlay */}
        {faceState === 'success' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand/80 rounded-3xl">
            <CheckCircle2 size={56} className="text-white mb-2" strokeWidth={1.5} />
            <p className="text-white font-semibold text-sm">Face verified!</p>
          </div>
        )}

        {/* Permission denied */}
        {faceState === 'denied' && (
          <div className="flex flex-col items-center gap-3 p-6 text-center">
            <ScanFace size={40} className="text-stone-500" />
            <p className="text-stone-400 text-sm leading-relaxed">
              Camera access was denied. Enable it in your browser settings and try again.
            </p>
          </div>
        )}

        {/* Scanning label */}
        {faceState === 'scanning' && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <span className="bg-black/50 text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-2">
              <Loader2 size={12} className="animate-spin" /> Scanning…
            </span>
          </div>
        )}
      </div>

      {faceState === 'preview' && (
        <button
          onClick={handleScan}
          className="w-full py-4 rounded-2xl bg-brand text-white font-semibold text-base flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <ScanFace size={18} />
          Scan face
        </button>
      )}

      {faceState === 'scanning' && (
        <button disabled className="w-full py-4 rounded-2xl bg-brand/60 text-white font-semibold text-base cursor-not-allowed">
          Scanning…
        </button>
      )}

      <style>{`
        @keyframes scanSweep {
          0%   { top: 10%; }
          50%  { top: 80%; }
          100% { top: 10%; }
        }
      `}</style>
    </div>
  );
}

/* ── Main AlternativeAuth component ─────────────────────── */
export function AlternativeAuth({ onSuccess, userType, isNewUser }: Props) {
  const [activeMethod, setActiveMethod] = useState<AltMethod>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogle = () => {
    setGoogleLoading(true);
    setTimeout(() => onSuccess(userType, isNewUser), 1100);
  };

  if (activeMethod === 'email') {
    return <EmailForm onSuccess={onSuccess} userType={userType} isNewUser={isNewUser} onBack={() => setActiveMethod(null)} />;
  }

  if (activeMethod === 'face') {
    return <FaceVerify onSuccess={onSuccess} userType={userType} isNewUser={isNewUser} onBack={() => setActiveMethod(null)} />;
  }

  return (
    <div className="space-y-3">
      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-stone-200" />
        <span className="text-xs text-stone-400 font-medium flex-shrink-0">or continue with</span>
        <div className="flex-1 h-px bg-stone-200" />
      </div>

      {/* Google */}
      <button
        onClick={handleGoogle}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-white border border-stone-200 text-stone-700 font-semibold text-sm active:bg-stone-50 hover:bg-stone-50 transition-colors disabled:opacity-60"
      >
        {googleLoading ? <Loader2 size={18} className="animate-spin text-stone-400" /> : <GoogleLogo />}
        {googleLoading ? 'Signing in…' : 'Continue with Google'}
      </button>

      {/* Email */}
      <button
        onClick={() => setActiveMethod('email')}
        className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-white border border-stone-200 text-stone-700 font-semibold text-sm active:bg-stone-50 hover:bg-stone-50 transition-colors"
      >
        <Mail size={17} className="text-stone-500" />
        Sign in with email
      </button>

      {/* Face */}
      <button
        onClick={() => setActiveMethod('face')}
        className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-white border border-stone-200 text-stone-700 font-semibold text-sm active:bg-stone-50 hover:bg-stone-50 transition-colors"
      >
        <ScanFace size={17} className="text-stone-500" />
        Use face verification
      </button>
    </div>
  );
}
