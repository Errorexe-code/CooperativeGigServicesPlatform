import { Fragment, useState } from 'react';
import { ChevronRight, Clock, CheckCircle2, XCircle, Loader, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { Avatar } from '@/components/Avatar';
import { RatingModal } from '@/components/RatingModal';
import { customerBookings, workers } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

const statusConfig = {
  booked:      { label: 'Booked',      color: '#1D4ED8', bg: '#DBEAFE', Icon: Clock },
  matched:     { label: 'Matched',     color: '#C4881A', bg: '#FDF3DC', Icon: Loader },
  in_progress: { label: 'In progress', color: '#2F6B57', bg: '#D0E6DE', Icon: Loader },
  completed:   { label: 'Completed',   color: '#2F6B57', bg: '#D0E6DE', Icon: CheckCircle2 },
  cancelled:   { label: 'Cancelled',   color: '#DC2626', bg: '#FEE2E2', Icon: XCircle },
};

export function CustomerBookings() {
  const navigate = useNavigate();
  const [rated, setRated] = useState<Set<string>>(new Set());
  const [ratingTarget, setRatingTarget] = useState<typeof customerBookings[0] | null>(null);

  const active = customerBookings.filter((b) => b.status !== 'completed' && b.status !== 'cancelled');
  const past   = customerBookings.filter((b) => b.status === 'completed' || b.status === 'cancelled');

  const handleRate = (booking: typeof customerBookings[0], e: React.MouseEvent) => {
    e.stopPropagation();
    setRatingTarget(booking);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <header className="px-4 md:px-8 pt-5 md:pt-8 pb-3 flex-shrink-0">
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-stone-900">My Bookings</h1>
        <p className="text-sm text-stone-500 mt-0.5">Track and manage your service requests</p>
      </header>

      <main className="flex-1 overflow-y-auto px-4 md:px-8 pb-24 md:pb-10 scrollbar-hide space-y-5">
        {/* Active bookings */}
        {active.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2.5">Active</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {active.map((booking) => {
                const cfg = statusConfig[booking.status];
                return (
                  <button
                    key={booking.id}
                    onClick={() => navigate('/service-status')}
                    className="w-full bg-white rounded-2xl border-2 border-brand/20 p-4 text-left active:scale-[0.99] transition-transform shadow-sm hover:border-brand/40"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar name={booking.workerName} initials={booking.workerInitials} size="lg" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-stone-900 text-sm truncate">{booking.workerName}</p>
                          <p className="font-bold text-brand text-sm flex-shrink-0">{formatCurrency(booking.amount)}</p>
                        </div>
                        <p className="text-sm text-stone-500 mt-0.5">{booking.skillEmoji} {booking.skill}</p>
                        <p className="text-xs text-stone-400 mt-0.5">{booking.date}</p>
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: cfg.bg }}>
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: cfg.color }} />
                          <span className="text-xs font-semibold" style={{ color: cfg.color }}>{cfg.label}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-100">
                      <p className="text-xs text-stone-400 font-mono">{booking.id}</p>
                      <div className="flex items-center gap-1 text-xs text-brand font-semibold">
                        Track service <ChevronRight size={13} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA to book */}
        <button
          onClick={() => navigate('/search')}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-brand/30 text-brand text-sm font-semibold flex items-center justify-center gap-2 active:bg-brand-light hover:bg-brand-light transition-colors"
        >
          + Book a new service
        </button>

        {/* Past bookings */}
        {past.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2.5">Past bookings</p>
            <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
              {past.map((booking, i) => {
                const cfg = statusConfig[booking.status];
                const isCompleted = booking.status === 'completed';
                const hasRated = rated.has(booking.id);
                return (
                  <Fragment key={booking.id}>
                    {i > 0 && <div className="h-px bg-stone-50 mx-4" />}
                    <div className="flex items-center gap-3 px-4 py-3.5">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: cfg.bg }}>
                        <span className="text-base">{booking.skillEmoji}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-stone-900 truncate">{booking.workerName}</p>
                        <p className="text-xs text-stone-500">{booking.skill} · {booking.date}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <p className="text-sm font-semibold text-stone-800">{formatCurrency(booking.amount)}</p>
                        {isCompleted && !hasRated ? (
                          <button
                            onClick={(e) => handleRate(booking, e)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-light border border-amber-warm/30 text-xs font-semibold text-amber-600 active:scale-95 transition-transform hover:bg-amber-warm/20"
                          >
                            <Star size={11} fill="currentColor" className="text-amber-400" />
                            Rate
                          </button>
                        ) : isCompleted && hasRated ? (
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-light text-xs font-medium text-brand">
                            <Star size={11} fill="currentColor" className="text-brand" />
                            Rated
                          </span>
                        ) : (
                          <p className="text-xs font-medium" style={{ color: cfg.color }}>{cfg.label}</p>
                        )}
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <BottomNav />

      {ratingTarget && (
        <RatingModal
          subjectName={ratingTarget.workerName}
          subjectInitials={ratingTarget.workerInitials}
          subjectRole="worker"
          skillLabel={`${ratingTarget.skillEmoji} ${ratingTarget.skill}`}
          onClose={() => setRatingTarget(null)}
          onSubmit={() => {
            setRated((prev) => new Set([...prev, ratingTarget.id]));
            setRatingTarget(null);
          }}
        />
      )}
    </div>
  );
}
