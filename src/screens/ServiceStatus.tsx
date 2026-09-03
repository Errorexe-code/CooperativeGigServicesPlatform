import { useState } from 'react';
import { CheckCircle2, Circle, Clock, Phone, MessageCircle, AlertTriangle, XCircle, Zap } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Avatar } from '@/components/Avatar';
import { BackHeader } from '@/components/BackHeader';
import { RatingModal } from '@/components/RatingModal';
import { workers, mockBooking, cancelConfig } from '@/lib/mock-data';

const STEPS = [
  { key: 'booked',      label: 'Booked',      sublabel: 'Your booking was received',    time: '9:42 AM' },
  { key: 'matched',     label: 'Matched',      sublabel: 'Worker confirmed your booking', time: '9:55 AM' },
  { key: 'in_progress', label: 'In progress',  sublabel: 'Worker is at your location',    time: '10:03 AM' },
  { key: 'completed',   label: 'Completed',    sublabel: 'Service done — rate your experience', time: null },
];

const STATUS_ORDER = ['booked', 'matched', 'in_progress', 'completed'];

function isWithinPenaltyWindow(status: string): boolean {
  return status === 'in_progress' || status === 'matched';
}

export function ServiceStatus() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isUrgent = searchParams.get('urgent') === 'true';
  const [localStatus, setLocalStatus] = useState(mockBooking.status);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [penaltyApplied, setPenaltyApplied] = useState(false);

  const worker = workers.find((w) => w.id === mockBooking.workerId) ?? workers[0];
  const isCancelled = localStatus === 'cancelled';
  const currentIndex = isCancelled ? -1 : STATUS_ORDER.indexOf(localStatus);
  const hasPenalty = isWithinPenaltyWindow(mockBooking.status);

  const handleCancelConfirm = () => {
    if (hasPenalty) setPenaltyApplied(true);
    setLocalStatus('cancelled');
    setShowCancelDialog(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <BackHeader
        title="Track service"
        subtitle={`Booking ${mockBooking.id}`}
        action={isUrgent ? (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-coop-light text-coop text-xs font-bold">
            <Zap size={11} fill="currentColor" /> Urgent
          </span>
        ) : undefined}
      />

      <main className="flex-1 overflow-y-auto px-4 md:px-8 pt-4 pb-8 scrollbar-hide">
        <div className="max-w-2xl mx-auto space-y-4">

          {/* Cancelled banner */}
          {isCancelled ? (
            <div className="rounded-2xl p-4 flex items-center gap-3 bg-red-50 border border-red-100">
              <XCircle size={20} className="text-red-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-700 text-sm">Booking cancelled</p>
                <p className="text-red-500 text-xs mt-0.5">
                  {penaltyApplied
                    ? `A cancellation penalty of ₹${cancelConfig.penaltyAmount} has been applied.`
                    : 'No penalty applied — cancelled with sufficient notice.'}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Worker card */}
              <div className="bg-white rounded-2xl p-4 border border-stone-100">
                <div className="flex items-center gap-3">
                  <Avatar name={worker.name} initials={worker.initials} size="lg" imageUrl={worker.imageUrl} />
                  <div className="flex-1">
                    <p className="font-semibold text-stone-900">{worker.name}</p>
                    <p className="text-sm text-stone-500">{worker.skillEmoji} {worker.skill}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{mockBooking.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-stone-400">ETA</p>
                    <p className="font-semibold text-stone-900 text-sm">{mockBooking.time.split('–')[0].trim()}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-100 text-stone-700 text-sm font-medium active:bg-stone-200">
                    <Phone size={14} />
                    Call
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-light text-brand text-sm font-medium active:opacity-80">
                    <MessageCircle size={14} />
                    Message
                  </button>
                </div>
              </div>

              {/* Current status banner */}
              <div className="rounded-2xl p-4 flex items-center gap-3" style={{ backgroundColor: isUrgent ? '#F9E5DF' : '#D0E6DE' }}>
                {isUrgent ? <Zap size={20} className="text-coop flex-shrink-0" fill="currentColor" /> : <Clock size={20} className="text-brand flex-shrink-0" />}
                <div className="flex-1">
                  <p className={`font-semibold text-sm ${isUrgent ? 'text-coop' : 'text-brand'}`}>{STEPS[currentIndex]?.label}</p>
                  <p className={`text-xs ${isUrgent ? 'text-coop/70' : 'text-brand'}`}>{STEPS[currentIndex]?.sublabel}</p>
                </div>
                {isUrgent && (
                  <span className="text-xs font-semibold text-coop bg-white/60 px-2 py-0.5 rounded-full">Priority</span>
                )}
              </div>
            </>
          )}

          {/* Stepper */}
          <div className="bg-white rounded-2xl p-5 border border-stone-100">
            <h3 className="font-semibold text-stone-900 text-sm mb-5">Service timeline</h3>
            <div className="relative">
              <div className="absolute left-[18px] top-4 bottom-4 w-0.5 bg-stone-100" />
              {!isCancelled && (
                <div
                  className="absolute left-[18px] top-4 w-0.5 bg-brand transition-all duration-700"
                  style={{ height: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
                />
              )}

              <div className="space-y-7">
                {STEPS.map((step, i) => {
                  const done = !isCancelled && i < currentIndex;
                  const active = !isCancelled && i === currentIndex;

                  return (
                    <div key={step.key} className="flex items-start gap-4 relative">
                      <div className="flex-shrink-0 relative z-10">
                        {done ? (
                          <CheckCircle2 size={22} className="text-brand" fill="#D0E6DE" />
                        ) : active ? (
                          <div className="w-[22px] h-[22px] rounded-full bg-brand border-4 border-brand-muted ring-2 ring-brand/20" />
                        ) : (
                          <Circle size={22} className="text-stone-200" fill="white" />
                        )}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-semibold ${done || active ? 'text-stone-900' : 'text-stone-400'}`}>
                            {step.label}
                          </p>
                          {step.time && (done || active) && (
                            <span className="text-xs text-stone-400">{step.time}</span>
                          )}
                        </div>
                        <p className={`text-xs mt-0.5 leading-relaxed ${done || active ? 'text-stone-500' : 'text-stone-300'}`}>
                          {step.sublabel}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Booking details */}
          <div className="bg-white rounded-2xl border border-stone-100 divide-y divide-stone-50">
            {[
              { label: 'Service', value: `${worker.skillEmoji} ${mockBooking.skill}` },
              { label: 'Date', value: mockBooking.date },
              { label: 'Time', value: mockBooking.time },
              { label: 'Amount', value: `₹${mockBooking.amount}` },
              ...(penaltyApplied ? [{ label: 'Penalty', value: `−₹${cancelConfig.penaltyAmount}` }] : []),
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center px-4 py-3">
                <span className="text-sm text-stone-500">{label}</span>
                <span className={`text-sm font-medium ${label === 'Penalty' ? 'text-red-600' : 'text-stone-900'}`}>{value}</span>
              </div>
            ))}
          </div>

          {/* QR verify CTA */}
          {!isCancelled && (
            <button
              onClick={() => navigate('/qr-verify')}
              className="w-full py-3.5 rounded-2xl border-2 border-dashed border-brand/40 text-brand text-sm font-semibold flex items-center justify-center gap-2 active:bg-brand-light transition-colors"
            >
              🔍 Scan QR to verify worker identity
            </button>
          )}

          {/* Rate worker CTA (after completed) */}
          {localStatus === 'completed' && (
            <button
              onClick={() => setShowRatingModal(true)}
              className="w-full py-3.5 rounded-2xl bg-amber-warm text-white font-semibold text-sm flex items-center justify-center gap-2 active:opacity-90 transition-opacity"
            >
              ⭐ Rate {worker.name.split(' ')[0]}
            </button>
          )}

          {/* Cancel booking */}
          {!isCancelled && localStatus !== 'completed' && (
            <button
              onClick={() => setShowCancelDialog(true)}
              className="w-full py-3 rounded-2xl border border-red-200 text-red-500 text-sm font-medium active:bg-red-50 hover:bg-red-50 transition-colors"
            >
              Cancel booking
            </button>
          )}
        </div>
      </main>

      {/* Cancel confirmation dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCancelDialog(false)} />
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl">
            {hasPenalty ? (
              <>
                <div className="flex flex-col items-center text-center mb-5">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-3">
                    <AlertTriangle size={22} className="text-red-500" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-stone-900 mb-2">Late cancellation</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    Cancelling within {cancelConfig.windowHours} hours of the scheduled time incurs a penalty.
                  </p>
                </div>
                <div className="bg-red-50 rounded-2xl p-4 mb-5 flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-red-700">Cancellation penalty</p>
                    <p className="text-xs text-red-500 mt-0.5">Deducted from your account</p>
                  </div>
                  <p className="font-display text-2xl font-bold text-red-600">₹{cancelConfig.penaltyAmount}</p>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-display text-xl font-semibold text-stone-900 text-center mb-2">Cancel booking?</h3>
                <p className="text-stone-500 text-sm text-center mb-5">
                  You have enough notice — no penalty will apply.
                </p>
              </>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelDialog(false)}
                className="flex-1 py-3 rounded-2xl border border-stone-200 text-stone-600 font-medium text-sm active:bg-stone-50"
              >
                Keep booking
              </button>
              <button
                onClick={handleCancelConfirm}
                className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-semibold text-sm active:scale-95 transition-transform"
              >
                {hasPenalty ? `Pay ₹${cancelConfig.penaltyAmount} & cancel` : 'Cancel booking'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showRatingModal && (
        <RatingModal
          subjectName={worker.name}
          subjectInitials={worker.initials}
          subjectRole="worker"
          skillLabel={`${worker.skillEmoji} ${worker.skill}`}
          onClose={() => setShowRatingModal(false)}
        />
      )}
    </div>
  );
}
