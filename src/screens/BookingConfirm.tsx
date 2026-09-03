import { useState } from 'react';
import { Calendar, Clock, MapPin, Check, ChevronRight, Zap } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Avatar } from '@/components/Avatar';
import { BackHeader } from '@/components/BackHeader';
import { workers, mockBooking } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

const URGENT_FEE_PERCENT = 15;

const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
];

const DATES = [
  { label: 'Today', sub: '2 Sep' },
  { label: 'Tomorrow', sub: '3 Sep' },
  { label: 'Thu', sub: '4 Sep' },
  { label: 'Fri', sub: '5 Sep' },
  { label: 'Sat', sub: '6 Sep' },
];

export function BookingConfirm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const workerId = searchParams.get('workerId') ?? '1';
  const isUrgent = searchParams.get('urgent') === 'true';
  const worker = workers.find((w) => w.id === workerId) ?? workers[0];

  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [confirmed, setConfirmed] = useState(false);

  const baseAmount = mockBooking.amount;
  const platformFee = Math.round(baseAmount * 0.1);
  const urgentFee = isUrgent ? Math.round(baseAmount * (URGENT_FEE_PERCENT / 100)) : 0;
  const total = baseAmount + platformFee + urgentFee;

  if (confirmed) {
    return (
      <div className="flex flex-col min-h-screen bg-cream">
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="max-w-sm w-full">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 shadow-lg mx-auto ${isUrgent ? 'bg-coop' : 'bg-brand'}`}>
              <Check size={36} className="text-white" strokeWidth={3} />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <h1 className="font-display text-2xl font-semibold text-stone-900">Booking confirmed!</h1>
              {isUrgent && <span className="text-xl">⚡</span>}
            </div>
            <p className="text-stone-500 text-sm leading-relaxed">
              {isUrgent
                ? `${worker.name} has been notified of your urgent request and will respond within minutes.`
                : `${worker.name} has been notified. You'll receive a confirmation once they accept.`}
            </p>

            {isUrgent && (
              <div className="w-full mt-4 bg-coop-light rounded-2xl p-3 flex items-center gap-2.5 border border-coop/15">
                <Zap size={15} className="text-coop flex-shrink-0" fill="currentColor" />
                <p className="text-xs text-stone-600 text-left leading-relaxed">
                  Urgent priority applied · {URGENT_FEE_PERCENT}% fee includes ₹{Math.round(urgentFee * 0.6)} extra for {worker.name.split(' ')[0]}
                </p>
              </div>
            )}

            <div className="w-full mt-4 bg-white rounded-2xl border border-stone-100 divide-y divide-stone-50 text-left">
              <div className="flex items-center gap-3 p-4">
                <Avatar name={worker.name} initials={worker.initials} size="md" imageUrl={worker.imageUrl} />
                <div className="flex-1">
                  <p className="font-semibold text-stone-900 text-sm">{worker.name}</p>
                  <p className="text-xs text-stone-500">{worker.skillEmoji} {worker.skill}</p>
                </div>
                {isUrgent && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-coop-light text-coop text-xs font-bold">
                    <Zap size={10} fill="currentColor" /> Urgent
                  </span>
                )}
              </div>
              {[
                { Icon: Calendar, label: DATES[selectedDate].label + ', ' + DATES[selectedDate].sub + ' Sep 2024' },
                { Icon: Clock, label: selectedTime },
                { Icon: MapPin, label: mockBooking.address },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-start gap-3 p-4">
                  <Icon size={16} className="text-brand mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-stone-700">{label}</p>
                </div>
              ))}
              <div className="flex items-center justify-between p-4">
                <span className="text-sm text-stone-500">Total paid</span>
                <span className="text-sm font-bold text-stone-900">{formatCurrency(total)}</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="text-sm text-stone-500">Booking ID</span>
                <span className="text-sm font-mono font-semibold text-stone-900">{mockBooking.id}</span>
              </div>
            </div>

            <div className="w-full mt-4 space-y-2">
              <button
                onClick={() => navigate(`/service-status${isUrgent ? '?urgent=true' : ''}`)}
                className={`w-full py-3.5 rounded-2xl font-semibold text-sm active:scale-95 transition-transform text-white ${isUrgent ? 'bg-coop' : 'bg-brand'}`}
              >
                Track service status
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full py-3 text-stone-500 text-sm font-medium active:opacity-70"
              >
                Back to home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <BackHeader title="Confirm booking" subtitle={`${worker.skillEmoji} ${worker.skill} · ${worker.name}`} />

      <main className="flex-1 overflow-y-auto px-4 md:px-8 pt-4 pb-36 scrollbar-hide">
        <div className="max-w-2xl mx-auto space-y-4">

          {/* Urgent banner */}
          {isUrgent && (
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-coop-light border border-coop/20">
              <Zap size={18} className="text-coop flex-shrink-0 mt-0.5" fill="currentColor" />
              <div>
                <p className="font-semibold text-coop text-sm">Urgent booking</p>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  Urgent bookings are matched faster and include a <span className="font-semibold text-coop">{URGENT_FEE_PERCENT}% priority fee</span>, of which 60% goes directly to {worker.name.split(' ')[0]} for short-notice availability.
                </p>
              </div>
            </div>
          )}

          {/* Worker summary */}
          <div className="bg-white rounded-2xl p-4 border border-stone-100 flex items-center gap-3">
            <Avatar name={worker.name} initials={worker.initials} size="lg" imageUrl={worker.imageUrl} />
            <div className="flex-1">
              <p className="font-semibold text-stone-900">{worker.name}</p>
              <p className="text-sm text-stone-500">{worker.skillEmoji} {worker.skill}</p>
              <p className="text-xs text-stone-400 mt-0.5">{worker.completedJobs} jobs · {worker.vouches} vouches</p>
            </div>
            {isUrgent ? (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-coop-light text-coop text-xs font-bold flex-shrink-0">
                <Zap size={11} fill="currentColor" /> Urgent
              </span>
            ) : (
              <ChevronRight size={18} className="text-stone-300" />
            )}
          </div>

          {/* Date selection */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Calendar size={16} className="text-brand" />
              <h3 className="font-semibold text-stone-900 text-sm">Select date</h3>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {DATES.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDate(i)}
                  disabled={isUrgent && i !== 0}
                  className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-2xl border-2 transition-all min-w-[72px] ${
                    selectedDate === i ? 'border-brand bg-brand-light' : 'border-stone-200 bg-white'
                  } disabled:opacity-30 disabled:cursor-not-allowed`}
                >
                  <span className={`text-xs font-semibold ${selectedDate === i ? 'text-brand' : 'text-stone-600'}`}>{d.label}</span>
                  <span className={`text-sm font-bold mt-0.5 ${selectedDate === i ? 'text-brand' : 'text-stone-900'}`}>{d.sub}</span>
                </button>
              ))}
            </div>
            {isUrgent && (
              <p className="text-xs text-stone-400 mt-1.5 px-1">Urgent bookings are today only</p>
            )}
          </div>

          {/* Time slots */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Clock size={16} className="text-brand" />
              <h3 className="font-semibold text-stone-900 text-sm">Select time</h3>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                    selectedTime === t ? 'border-brand bg-brand-light text-brand' : 'border-stone-200 bg-white text-stone-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Address */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <MapPin size={16} className="text-brand" />
              <h3 className="font-semibold text-stone-900 text-sm">Service address</h3>
            </div>
            <div className="bg-white rounded-2xl border border-stone-200 p-4">
              <p className="text-sm text-stone-700 leading-relaxed">{mockBooking.address}</p>
              <button className="mt-2 text-xs text-brand font-medium">Change address</button>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl border border-stone-100 p-4 space-y-3">
            <h3 className="font-semibold text-stone-900 text-sm">Estimated cost</h3>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Service charge</span>
              <span className="text-stone-800 font-medium">{formatCurrency(baseAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Platform fee (10%)</span>
              <span className="text-stone-800 font-medium">{formatCurrency(platformFee)}</span>
            </div>
            {isUrgent && (
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1.5 text-coop font-medium">
                  <Zap size={12} fill="currentColor" /> Priority fee ({URGENT_FEE_PERCENT}%)
                </span>
                <span className="text-coop font-semibold">+{formatCurrency(urgentFee)}</span>
              </div>
            )}
            <div className="border-t border-stone-100 pt-3 flex justify-between">
              <span className="font-semibold text-stone-900 text-sm">Total</span>
              <span className={`font-bold text-base ${isUrgent ? 'text-coop' : 'text-brand'}`}>
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 p-4 bg-white border-t border-stone-100">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setConfirmed(true)}
            className={`w-full py-4 rounded-2xl font-semibold text-base active:scale-95 transition-transform shadow-sm text-white flex items-center justify-center gap-2 ${isUrgent ? 'bg-coop' : 'bg-brand'}`}
          >
            {isUrgent && <Zap size={18} fill="currentColor" />}
            Confirm booking · {formatCurrency(total)}
          </button>
          <p className="text-center text-xs text-stone-400 mt-2">Pay after service is completed</p>
        </div>
      </div>
    </div>
  );
}
