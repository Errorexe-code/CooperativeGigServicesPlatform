import { useState } from 'react';
import { MapPin, Clock, Check, X, Zap, ChevronRight, TrendingUp, ArrowLeftRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { useRole } from '@/lib/role-context';
import { jobRequests, todaySchedule, workers } from '@/lib/mock-data';
import { getAvatarColor, formatCurrency } from '@/lib/utils';

const worker = workers[0];

export function WorkerHomeScreen() {
  const navigate = useNavigate();
  const { setRole, setIsWorker } = useRole();
  const [available, setAvailable] = useState(true);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [accepted, setAccepted] = useState<Set<string>>(new Set());

  const pending = jobRequests.filter((r) => !dismissed.has(r.id) && !accepted.has(r.id));
  const acceptedJobs = jobRequests.filter((r) => accepted.has(r.id));

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      {/* Mobile header */}
      <header className="md:hidden px-4 pt-5 pb-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-stone-500 font-medium">Namasthe,</p>
            <h1 className="font-display text-2xl font-semibold text-stone-900">{worker.name.split(' ')[0]} 👷</h1>
          </div>
        </div>
        <div className="flex bg-stone-100 rounded-2xl p-1">
          <button onClick={() => setRole('customer')} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-stone-500">👤 Customer</button>
          <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-brand text-white shadow-sm">👷 Worker</button>
        </div>
      </header>

      {/* Desktop header */}
      <div className="hidden md:flex items-center justify-between px-8 pt-8 pb-4">
        <div>
          <p className="text-sm text-stone-500">Namasthe,</p>
          <h1 className="font-display text-3xl font-semibold text-stone-900">{worker.name} 👷</h1>
        </div>
        <button
          onClick={() => { setRole('customer'); setIsWorker(false); navigate('/'); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 bg-white text-stone-600 text-sm font-medium hover:bg-stone-50 transition-colors"
        >
          <ArrowLeftRight size={14} />
          Switch to Customer
        </button>
      </div>

      <main className="flex-1 pb-24 md:pb-10">
        {/* Worker mode banner (mobile) */}
        <div className="md:hidden mx-4 mb-3 flex items-center gap-3 bg-brand-muted rounded-2xl px-4 py-2.5">
          <span className="text-sm font-semibold text-brand">👷 Worker mode active</span>
        </div>

        {/* Availability toggle */}
        <div className={`mx-4 md:mx-8 mb-4 rounded-2xl p-4 flex items-center gap-4 transition-colors ${available ? 'bg-brand' : 'bg-stone-200'}`}>
          <div className="flex-1">
            <p className={`font-semibold text-sm ${available ? 'text-white' : 'text-stone-600'}`}>
              {available ? '● You are available' : '○ You are offline'}
            </p>
            <p className={`text-xs mt-0.5 ${available ? 'text-white/70' : 'text-stone-500'}`}>
              {available ? 'Customers in your area can request you' : 'Toggle on to start receiving requests'}
            </p>
          </div>
          <button
            onClick={() => setAvailable((v) => !v)}
            className={`w-14 h-8 rounded-full relative flex-shrink-0 transition-all duration-300 ${available ? 'bg-white/30' : 'bg-stone-300'}`}
          >
            <span className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-sm transition-all duration-300 ${available ? 'left-7' : 'left-1'}`} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mx-4 md:mx-8 mb-5">
          {[
            { label: "Today's earn", value: formatCurrency(1250), icon: '💰' },
            { label: 'Jobs today', value: String(todaySchedule.length), icon: '📋' },
            { label: 'Rating', value: String(worker.rating), icon: '⭐' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-white rounded-2xl p-3 border border-stone-100 text-center">
              <p className="text-lg">{icon}</p>
              <p className="font-bold text-stone-900 text-base leading-tight mt-1">{value}</p>
              <p className="text-xs text-stone-400 mt-0.5 leading-tight">{label}</p>
            </div>
          ))}
        </div>

        {/* Desktop: 2-column */}
        <div className="md:grid md:grid-cols-2 md:gap-6 md:px-8">

          {/* Left: Job requests */}
          <div>
            {available && pending.length > 0 && (
              <div className="px-4 md:px-0 mb-4">
                <div className="flex items-center justify-between mb-2.5">
                  <h2 className="font-semibold text-stone-900 text-sm">
                    New requests
                    <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full">{pending.length}</span>
                  </h2>
                </div>
                <div className="space-y-3">
                  {pending.map((req) => {
                    const colors = getAvatarColor(req.customerName);
                    return (
                      <div key={req.id} className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
                        {req.urgent && (
                          <div className="flex items-center gap-1.5 px-4 py-2 bg-red-50 border-b border-red-100">
                            <Zap size={12} fill="#DC2626" className="text-red-500" />
                            <p className="text-xs font-semibold text-red-600">Urgent request</p>
                          </div>
                        )}
                        <div className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0" style={{ backgroundColor: colors.bg, color: colors.text }}>
                              {req.customerInitials}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-stone-900 text-sm">{req.customerName}</p>
                              <p className="text-sm text-stone-700 mt-0.5">{req.skillEmoji} {req.service}</p>
                              <div className="flex items-center gap-3 mt-1.5">
                                <span className="flex items-center gap-1 text-xs text-stone-500"><MapPin size={11} /> {req.distance}</span>
                                <span className="flex items-center gap-1 text-xs text-stone-500"><Clock size={11} /> {req.time}</span>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="font-bold text-brand text-base">₹{req.amount}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <button onClick={() => setDismissed((s) => new Set(s).add(req.id))} className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-sm font-medium flex items-center justify-center gap-1.5 hover:bg-stone-50">
                              <X size={14} /> Decline
                            </button>
                            <button onClick={() => setAccepted((s) => new Set(s).add(req.id))} className="flex-1 py-2.5 rounded-xl bg-brand text-white text-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-brand-dark transition-colors">
                              <Check size={14} strokeWidth={3} /> Accept
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {acceptedJobs.length > 0 && (
              <div className="mx-4 md:mx-0 mb-4 bg-brand-light rounded-2xl p-4 border border-brand/20">
                <p className="text-sm font-semibold text-brand mb-1">✓ {acceptedJobs.length} job{acceptedJobs.length > 1 ? 's' : ''} accepted</p>
                <p className="text-xs text-brand">{acceptedJobs.map((r) => r.service).join(' · ')}</p>
              </div>
            )}

            {/* Earnings teaser */}
            <div className="px-4 md:px-0">
              <button onClick={() => navigate('/profile')} className="w-full bg-white rounded-2xl border border-stone-100 p-4 flex items-center gap-3 hover:bg-stone-50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={18} className="text-brand" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-stone-900">Total earnings</p>
                  <p className="text-base font-bold text-brand">{formatCurrency(worker.earnings.total)}</p>
                </div>
                <ChevronRight size={18} className="text-stone-300" />
              </button>
            </div>
          </div>

          {/* Right: Today's schedule */}
          <div className="px-4 md:px-0 mt-4 md:mt-0">
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="font-semibold text-stone-900 text-sm">Today's schedule</h2>
              <button className="text-xs text-brand font-medium" onClick={() => navigate('/worker-schedule')}>Full schedule →</button>
            </div>
            <div className="space-y-2">
              {todaySchedule.map((job) => (
                <div key={job.id} className="bg-white rounded-2xl border border-stone-100 p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${job.status === 'completed' ? 'bg-brand-muted' : 'bg-amber-light'}`}>
                    {job.status === 'completed' ? <Check size={16} className="text-brand" strokeWidth={3} /> : <Clock size={16} className="text-amber-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-900 truncate">{job.service}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{job.time} · {job.customerName}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-stone-900">₹{job.amount}</p>
                    <p className={`text-xs font-medium mt-0.5 ${job.status === 'completed' ? 'text-brand' : 'text-amber-600'}`}>
                      {job.status === 'completed' ? 'Done' : 'Upcoming'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick links */}
            <div className="space-y-2 mt-4">
              {[
                { emoji: '📍', label: 'Service radius', sub: `Currently ${worker.radius} km`, path: '/radius-setting' },
                { emoji: '🔐', label: 'QR verification', sub: 'Show your ID to customers', path: '/qr-verify' },
              ].map(({ emoji, label, sub, path }) => (
                <button key={path} onClick={() => navigate(path)} className="w-full flex items-center gap-3 bg-white rounded-2xl border border-stone-100 p-4 hover:bg-stone-50 transition-colors">
                  <span className="text-xl">{emoji}</span>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-stone-900">{label}</p>
                    <p className="text-xs text-stone-500">{sub}</p>
                  </div>
                  <ChevronRight size={16} className="text-stone-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
