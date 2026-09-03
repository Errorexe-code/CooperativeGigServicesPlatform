import { useState } from 'react';
import { MapPin, Phone, ChevronRight, CheckCircle2, Clock, CalendarDays, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { workerSchedule, type ScheduledJob } from '@/lib/mock-data';
import { formatCurrency, getAvatarColor } from '@/lib/utils';

type Tab = 'today' | 'upcoming' | 'past';

const statusConfig = {
  upcoming:   { label: 'Upcoming',    bg: '#FDF3DC', color: '#C4881A', dot: 'bg-amber-400' },
  in_progress:{ label: 'In progress', bg: '#D0E6DE', color: '#2F6B57', dot: 'bg-brand animate-pulse' },
  completed:  { label: 'Done',        bg: '#EAF4F0', color: '#2F6B57', dot: 'bg-brand' },
  cancelled:  { label: 'Cancelled',   bg: '#FEE2E2', color: '#DC2626', dot: 'bg-red-400' },
};

export function WorkerSchedule() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('today');

  const today    = workerSchedule.filter((j) => j.date === 'Today');
  const upcoming = workerSchedule.filter((j) => j.date !== 'Today');
  const past     = workerSchedule.filter((j) => j.status === 'completed');

  const todayEarnings = today
    .filter((j) => j.status === 'completed' || j.status === 'upcoming')
    .reduce((s, j) => s + j.amount, 0);

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      {/* Header */}
      <header className="px-4 md:px-8 pt-5 md:pt-8 pb-3 flex-shrink-0">
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-stone-900">My Schedule</h1>
        <p className="text-sm text-stone-500 mt-0.5">Thursday, 5 September 2024</p>
      </header>

      {/* Summary strip */}
      <div className="mx-4 md:mx-8 mb-3 grid grid-cols-3 gap-2 flex-shrink-0">
        {[
          { label: "Today's jobs",  value: String(today.length),         Icon: CalendarDays, color: 'text-brand' },
          { label: 'Upcoming',      value: String(upcoming.length),       Icon: Clock,        color: 'text-amber-500' },
          { label: "Today's earn",  value: formatCurrency(todayEarnings), Icon: IndianRupee,  color: 'text-brand' },
        ].map(({ label, value, Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-3 border border-stone-100 text-center">
            <Icon size={16} className={`${color} mx-auto mb-1`} />
            <p className={`font-bold text-base leading-tight ${color}`}>{value}</p>
            <p className="text-[10px] text-stone-400 mt-0.5 leading-tight">{label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="px-4 md:px-8 mb-3 flex-shrink-0">
        <div className="flex bg-stone-100 rounded-2xl p-1 md:max-w-sm">
          {([
            { key: 'today',    label: `Today (${today.length})` },
            { key: 'upcoming', label: `Upcoming (${upcoming.length})` },
            { key: 'past',     label: 'Past' },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                tab === key ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 md:px-8 pb-24 md:pb-10 scrollbar-hide">
        <div className="md:max-w-3xl">
          {tab === 'today' && (
            today.length === 0 ? (
              <EmptyState emoji="📅" message="No jobs scheduled for today" />
            ) : (
              <Timeline jobs={today} navigate={navigate} />
            )
          )}

          {tab === 'upcoming' && (
            upcoming.length === 0 ? (
              <EmptyState emoji="📆" message="No upcoming jobs" />
            ) : (
              (() => {
                const byDate = upcoming.reduce<Record<string, ScheduledJob[]>>((acc, j) => {
                  (acc[j.dateLabel] ??= []).push(j);
                  return acc;
                }, {});
                return Object.entries(byDate).map(([dateLabel, jobs]) => (
                  <div key={dateLabel} className="mb-5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <CalendarDays size={13} className="text-stone-400" />
                      <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide">{dateLabel}</p>
                    </div>
                    <div className="space-y-3">
                      {jobs.map((job) => (
                        <JobCard key={job.id} job={job} navigate={navigate} />
                      ))}
                    </div>
                  </div>
                ));
              })()
            )
          )}

          {tab === 'past' && (
            past.length === 0 ? (
              <EmptyState emoji="🕐" message="No completed jobs yet" />
            ) : (
              <div className="space-y-3">
                {past.map((job) => (
                  <JobCard key={job.id} job={job} navigate={navigate} showDate />
                ))}
              </div>
            )
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

function Timeline({ jobs, navigate }: { jobs: ScheduledJob[]; navigate: ReturnType<typeof useNavigate> }) {
  return (
    <div className="relative">
      <div className="absolute left-[27px] top-5 bottom-5 w-0.5 bg-stone-200" />
      <div className="space-y-4">
        {jobs.map((job) => {
          const cfg = statusConfig[job.status];
          const colors = getAvatarColor(job.customerName);
          return (
            <div key={job.id} className="flex gap-3">
              <div className="flex flex-col items-center flex-shrink-0 w-14 relative z-10">
                <div
                  className={`w-5 h-5 rounded-full border-2 border-white shadow-sm mt-4 ${cfg.dot}`}
                  style={job.status !== 'completed' && job.status !== 'in_progress' ? { backgroundColor: cfg.color } : undefined}
                />
                <p className="text-[10px] text-stone-500 font-semibold mt-1 leading-tight text-center">{job.time}</p>
              </div>

              <div className="flex-1 mb-0">
                <div className={`bg-white rounded-2xl border p-4 ${job.status === 'upcoming' ? 'border-amber-200 shadow-sm' : 'border-stone-100'}`}>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-semibold flex-shrink-0"
                      style={{ backgroundColor: colors.bg, color: colors.text }}
                    >
                      {job.customerInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="font-semibold text-stone-900 text-sm truncate">{job.customerName}</p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                      </div>
                      <p className="text-xs text-stone-600 mt-0.5">{job.skillEmoji} {job.service}</p>
                      <div className="flex items-start gap-1 mt-1">
                        <MapPin size={11} className="text-stone-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-stone-400 leading-snug truncate">{job.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-50">
                    <span className="font-bold text-brand text-sm">{formatCurrency(job.amount)}</span>
                    {job.status === 'upcoming' ? (
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 text-stone-600 text-xs font-semibold active:bg-stone-200">
                          <Phone size={11} />Call
                        </button>
                        <button
                          onClick={() => navigate('/service-status')}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand text-white text-xs font-semibold active:scale-95 transition-transform"
                        >
                          Track<ChevronRight size={11} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-brand text-xs font-semibold">
                        <CheckCircle2 size={14} />Completed
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function JobCard({ job, navigate, showDate }: { job: ScheduledJob; navigate: ReturnType<typeof useNavigate>; showDate?: boolean }) {
  const cfg = statusConfig[job.status];
  const colors = getAvatarColor(job.customerName);

  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold flex-shrink-0" style={{ backgroundColor: colors.bg, color: colors.text }}>
          {job.customerInitials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-stone-900 text-sm truncate">{job.customerName}</p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.bg, color: cfg.color }}>{cfg.label}</span>
          </div>
          <p className="text-xs text-stone-600 mt-0.5">{job.skillEmoji} {job.service}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-xs text-stone-400">
              <Clock size={11} />
              {showDate ? `${job.dateLabel} · ${job.time}` : job.time}
            </span>
          </div>
          <div className="flex items-start gap-1 mt-0.5">
            <MapPin size={11} className="text-stone-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-stone-400 leading-snug truncate">{job.address}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-50">
        <span className="font-bold text-brand text-sm">{formatCurrency(job.amount)}</span>
        {job.status === 'upcoming' && (
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 text-stone-600 text-xs font-semibold active:bg-stone-200">
              <Phone size={11} />Call
            </button>
            <button onClick={() => navigate('/service-status')} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand text-white text-xs font-semibold active:scale-95 transition-transform">
              Track<ChevronRight size={11} />
            </button>
          </div>
        )}
        {job.status === 'completed' && (
          <div className="flex items-center gap-1.5 text-brand text-xs font-semibold">
            <CheckCircle2 size={14} />Paid out
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ emoji, message }: { emoji: string; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <p className="text-4xl">{emoji}</p>
      <p className="text-stone-500 font-medium text-sm">{message}</p>
    </div>
  );
}
