import { useState } from 'react';
import { Star, MapPin, Briefcase, Calendar, QrCode, MessageSquare } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, VouchStack } from '@/components/Avatar';
import { VouchModal } from '@/components/VouchModal';
import { BackHeader } from '@/components/BackHeader';
import { workers } from '@/lib/mock-data';

export function WorkerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showVouchModal, setShowVouchModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'vouches' | 'reviews'>('about');

  const worker = workers.find((w) => w.id === id) ?? workers[0];

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <BackHeader
        title={worker.name}
        subtitle={`${worker.skillEmoji} ${worker.skill}`}
        action={
          <button
            onClick={() => navigate('/qr-verify')}
            className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center active:bg-stone-50 hover:bg-stone-50 transition-colors"
          >
            <QrCode size={17} className="text-stone-600" />
          </button>
        }
      />

      <div className="flex flex-1 min-h-0">
        {/* Main scrollable content */}
        <main className="flex-1 overflow-y-auto scrollbar-hide pb-32 md:pb-10">
          <div className="md:max-w-2xl md:mx-auto">
            {/* Profile hero */}
            <div className="px-4 md:px-0 md:pt-6 pt-5 pb-4">
              <div className="flex items-start gap-4">
                <Avatar name={worker.name} initials={worker.initials} size="xl" imageUrl={worker.imageUrl} />
                <div className="flex-1 min-w-0 pt-1">
                  <h1 className="font-display text-xl font-semibold text-stone-900 leading-tight">{worker.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: worker.available ? '#D0E6DE' : '#FEE2E2',
                        color: worker.available ? '#2F6B57' : '#B91C1C',
                      }}
                    >
                      {worker.available ? '● Available now' : '○ Unavailable'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Star size={13} fill="#F2B94B" className="text-amber-400" />
                      <span className="text-sm font-semibold text-stone-800">{worker.rating}</span>
                      <span className="text-xs text-stone-400">({worker.ratingCount})</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-stone-500">
                      <MapPin size={12} />
                      <span>{worker.distance} away</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="mx-4 md:mx-0 grid grid-cols-3 gap-2 mb-4">
              {[
                { label: 'Jobs done', value: worker.completedJobs },
                { label: 'Vouches', value: worker.vouches },
                { label: `Rating (${worker.ratingCount})`, value: worker.rating },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-2xl p-3 text-center border border-stone-100">
                  <p className="font-display text-xl font-semibold text-brand">{value}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Vouch stack */}
            <div className="mx-4 md:mx-0 bg-white rounded-2xl p-4 border border-stone-100 mb-4">
              <VouchStack vouchers={worker.vouchedBy} count={worker.vouches} />
            </div>

            {/* Tabs */}
            <div className="mx-4 md:mx-0 mb-3">
              <div className="flex bg-stone-100 rounded-2xl p-1">
                {(['about', 'vouches', 'reviews'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                      activeTab === tab ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                    }`}
                  >
                    {tab === 'reviews' ? `Reviews (${worker.reviews.length})` : tab}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'about' && (
              <div className="px-4 md:px-0 space-y-3">
                <div className="bg-white rounded-2xl p-4 border border-stone-100">
                  <p className="text-sm text-stone-600 leading-relaxed">{worker.bio}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-stone-100 space-y-3">
                  {[
                    { Icon: MapPin, label: 'Area', value: worker.location },
                    { Icon: Briefcase, label: 'Skill', value: `${worker.skillEmoji} ${worker.skill}` },
                    { Icon: Calendar, label: 'Member since', value: worker.joinedDate },
                  ].map(({ Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0">
                        <Icon size={14} className="text-brand" />
                      </div>
                      <div>
                        <p className="text-xs text-stone-400 font-medium">{label}</p>
                        <p className="text-sm text-stone-800 font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'vouches' && (
              <div className="px-4 md:px-0 space-y-2">
                {worker.vouchedBy.map((v) => {
                  const vouch = workers.find((w) => w.initials === v.initials);
                  return (
                    <div key={v.id} className="bg-white rounded-2xl p-4 border border-stone-100 flex items-center gap-3">
                      <Avatar name={v.name} initials={v.initials} size="sm" />
                      <div className="flex-1">
                        <p className="font-semibold text-stone-900 text-sm">{v.name}</p>
                        <p className="text-xs text-stone-500">{v.relation}</p>
                      </div>
                      {vouch && (
                        <span className="text-xs px-2 py-1 rounded-full bg-brand-light text-brand font-medium">
                          {vouch.vouches} vouches
                        </span>
                      )}
                    </div>
                  );
                })}
                <p className="text-center text-xs text-stone-400 py-2">
                  All vouches are from verified community members
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="px-4 md:px-0 space-y-3 pb-6">
                {worker.reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-2xl p-4 border border-stone-100">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-brand">{review.reviewerInitials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-stone-900 text-sm">{review.reviewerName}</p>
                          <span className="text-xs text-stone-400 flex-shrink-0">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5 mb-2">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={11}
                              fill={s <= review.rating ? '#F2B94B' : 'none'}
                              className={s <= review.rating ? 'text-amber-400' : 'text-stone-300'}
                              strokeWidth={1.5}
                            />
                          ))}
                          <span className="text-xs text-stone-400 ml-1">{review.service}</span>
                        </div>
                        <p className="text-sm text-stone-600 leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-brand-light border border-brand/10">
                  <MessageSquare size={14} className="text-brand flex-shrink-0" />
                  <p className="text-xs text-brand">
                    {worker.ratingCount} total ratings · avg {worker.rating} ★
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Desktop sidebar CTA */}
        <aside className="hidden md:flex md:flex-col md:w-72 md:flex-shrink-0 md:border-l md:border-stone-200 md:bg-white md:p-6 md:gap-3">
          <div className="bg-cream rounded-2xl p-4 mb-2">
            <p className="text-xs text-stone-500 font-medium mb-0.5">Rate</p>
            <p className="text-2xl font-display font-bold text-brand">₹350/hr</p>
          </div>
          <button
            onClick={() => navigate(`/booking-confirm?workerId=${worker.id}`)}
            disabled={!worker.available}
            className="w-full py-3.5 rounded-2xl bg-brand text-white font-semibold text-base active:scale-95 transition-transform disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
          >
            {worker.available ? `Book ${worker.name.split(' ')[0]}` : 'Currently unavailable'}
          </button>
          <button
            onClick={() => setShowVouchModal(true)}
            className="w-full py-3 rounded-2xl border border-brand text-brand font-semibold text-sm active:scale-95 hover:bg-brand-light transition-all"
          >
            🤝 Vouch for {worker.name.split(' ')[0]}
          </button>
        </aside>
      </div>

      {/* Mobile fixed CTAs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-stone-100 space-y-2 z-30">
        <button
          onClick={() => navigate(`/booking-confirm?workerId=${worker.id}`)}
          disabled={!worker.available}
          className="w-full py-3.5 rounded-2xl bg-brand text-white font-semibold text-base active:scale-95 transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {worker.available ? `Book ${worker.name.split(' ')[0]}` : 'Currently unavailable'}
        </button>
        <button
          onClick={() => setShowVouchModal(true)}
          className="w-full py-3 rounded-2xl border border-brand text-brand font-semibold text-sm active:scale-95 transition-transform"
        >
          🤝 Vouch for {worker.name.split(' ')[0]}
        </button>
      </div>

      {showVouchModal && <VouchModal worker={worker} onClose={() => setShowVouchModal(false)} />}
    </div>
  );
}
