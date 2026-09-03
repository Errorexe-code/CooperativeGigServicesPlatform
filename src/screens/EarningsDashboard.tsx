import { TrendingUp, Award, ChevronRight, Wallet, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { Avatar } from '@/components/Avatar';
import { workers, earningsSplitConfig, earningsHistory } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

const worker = workers[0];
const { earnings } = worker;

const MONTHLY_DATA = [
  { month: 'Apr', amount: 5200 },
  { month: 'May', amount: 6800 },
  { month: 'Jun', amount: 4900 },
  { month: 'Jul', amount: 7600 },
  { month: 'Aug', amount: 6300 },
  { month: 'Sep', amount: 7200 },
];

const maxAmount = Math.max(...MONTHLY_DATA.map((d) => d.amount));

export function EarningsDashboard() {
  const navigate = useNavigate();
  const { workerPercent, platformPercent, coopPercent } = earningsSplitConfig;

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      {/* Header */}
      <header className="px-4 md:px-8 pt-5 md:pt-8 pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-stone-500">Good morning,</p>
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-stone-900">{worker.name.split(' ')[0]} 👋</h1>
          </div>
          <Avatar name={worker.name} initials={worker.initials} size="md" />
        </div>
      </header>

      <main className="flex-1 pb-24 md:pb-10">
        <div className="md:grid md:grid-cols-2 md:gap-6 md:px-8 md:pb-6 px-4 space-y-4 md:space-y-0">

          {/* Left column */}
          <div className="space-y-4 md:pt-0 pt-4">
            {/* Total earnings hero */}
            <div className="bg-brand rounded-3xl p-5 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-white/5" />
              <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-1">Total earnings</p>
              <p className="font-display text-4xl font-semibold text-white relative z-10">
                {formatCurrency(earnings.total)}
              </p>
              <p className="text-white/70 text-sm mt-1 relative z-10">Since {worker.joinedDate}</p>
              <div className="flex items-center gap-4 mt-4 relative z-10">
                <div className="flex-1 bg-white/10 rounded-2xl p-3">
                  <p className="text-white/70 text-xs mb-0.5">This month</p>
                  <p className="text-white font-bold text-lg">{formatCurrency(earnings.thisMonth)}</p>
                </div>
                <div className="flex-1 bg-white/10 rounded-2xl p-3">
                  <p className="text-white/70 text-xs mb-0.5">Jobs done</p>
                  <p className="text-white font-bold text-lg">{worker.completedJobs}</p>
                </div>
              </div>
            </div>

            {/* Earnings split */}
            <div className="bg-white rounded-2xl p-5 border border-stone-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-stone-900 text-sm">How your earnings are split</h3>
                <button className="text-stone-400">
                  <Info size={15} />
                </button>
              </div>

              <div className="flex rounded-full overflow-hidden h-4 mb-4 gap-0.5">
                <div className="transition-all duration-700" style={{ width: `${workerPercent}%`, backgroundColor: '#2F6B57' }} />
                <div className="transition-all duration-700" style={{ width: `${platformPercent}%`, backgroundColor: '#F2B94B' }} />
                <div className="transition-all duration-700" style={{ width: `${coopPercent}%`, backgroundColor: '#C8664B' }} />
              </div>

              <div className="space-y-3">
                {[
                  { label: 'Your earnings', pct: workerPercent, amount: earnings.workerShare, color: '#2F6B57', bg: '#D0E6DE', note: 'Paid directly to you' },
                  { label: 'Platform fee', pct: platformPercent, amount: earnings.platformFee, color: '#C4881A', bg: '#FDF3DC', note: 'Covers app & support costs' },
                  { label: 'Coop fund', pct: coopPercent, amount: earnings.coopFund, color: '#C8664B', bg: '#F9E5DF', note: 'Community welfare & training' },
                ].map(({ label, pct, amount, color, bg, note }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-stone-800">{label}</span>
                        <span className="text-sm font-bold" style={{ color }}>{formatCurrency(amount)}</span>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-xs text-stone-400">{note}</span>
                        <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: bg, color }}>{pct}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-xl bg-coop-light flex gap-2">
                <Award size={16} className="text-coop flex-shrink-0 mt-0.5" />
                <p className="text-xs text-stone-700 leading-relaxed">
                  Your coop fund contribution goes towards skill training, emergency support, and building cooperative infrastructure for members like you.
                </p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Monthly chart */}
            <div className="bg-white rounded-2xl p-5 border border-stone-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-stone-900 text-sm">Monthly earnings</h3>
                <div className="flex items-center gap-1 text-xs text-brand font-medium">
                  <TrendingUp size={13} />
                  <span>+14% vs last month</span>
                </div>
              </div>
              <div className="flex items-end justify-between gap-2 h-24">
                {MONTHLY_DATA.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full flex flex-col justify-end" style={{ height: '80px' }}>
                      <div
                        className={`w-full rounded-t-lg transition-all duration-500 ${d.month === 'Sep' ? 'bg-brand' : 'bg-brand/25'}`}
                        style={{ height: `${(d.amount / maxAmount) * 80}px` }}
                      />
                    </div>
                    <span className={`text-[10px] font-medium ${d.month === 'Sep' ? 'text-brand' : 'text-stone-400'}`}>{d.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide px-1">Manage</p>
              {[
                { label: 'Service radius settings', emoji: '📍', path: '/radius-setting' },
                { label: 'Service status tracker', emoji: '📋', path: '/service-status' },
                { label: 'QR verification', emoji: '🔐', path: '/qr-verify' },
              ].map(({ label, emoji, path }) => (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className="w-full flex items-center gap-3 p-4 bg-white rounded-2xl border border-stone-100 active:bg-stone-50 hover:bg-stone-50 transition-colors"
                >
                  <span className="text-xl">{emoji}</span>
                  <span className="flex-1 text-sm font-medium text-stone-800 text-left">{label}</span>
                  <ChevronRight size={16} className="text-stone-300" />
                </button>
              ))}
            </div>

            {/* Withdraw button */}
            <button className="w-full py-4 rounded-2xl border-2 border-brand text-brand font-semibold text-base flex items-center justify-center gap-2 active:bg-brand-light hover:bg-brand-light transition-colors">
              <Wallet size={18} />
              Withdraw earnings · {formatCurrency(earnings.workerShare)}
            </button>
          </div>
        </div>

        {/* Earnings history — full width */}
        <div className="px-4 md:px-8 mt-6">
          <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-stone-50 flex items-center justify-between">
              <h3 className="font-semibold text-stone-900 text-sm">Transaction history</h3>
              <span className="text-xs text-stone-400">{earningsHistory.length} transactions</span>
            </div>

            {earningsHistory.map((txn, i) => {
              const isPenalty = txn.status === 'penalty';
              return (
                <div key={txn.id}>
                  {i > 0 && <div className="h-px bg-stone-50 mx-5" />}
                  <div className="px-5 py-4">
                    <div className="flex items-start gap-3">
                      {/* Emoji + date */}
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: isPenalty ? '#FEE2E2' : '#EAF4F0' }}>
                        <span className="text-base">{txn.skillEmoji}</span>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-stone-900 truncate">{txn.service}</p>
                          <span
                            className="flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: isPenalty ? '#FEE2E2' : '#D0E6DE',
                              color: isPenalty ? '#DC2626' : '#2F6B57',
                            }}
                          >
                            {isPenalty ? `−₹${txn.penaltyAmount}` : `+${formatCurrency(txn.workerEarned)}`}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-xs text-stone-500 truncate">
                            {txn.customerName} · {txn.date}
                          </p>
                        </div>

                        {!isPenalty && (
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-stone-400">
                              Total ₹{txn.totalAmount}
                            </span>
                            <span className="text-stone-200">·</span>
                            <span className="text-xs text-stone-400">
                              Fee −₹{txn.platformFee}
                            </span>
                            <span className="text-stone-200">·</span>
                            <span className="text-xs text-stone-400">
                              Coop −₹{txn.coopFund}
                            </span>
                          </div>
                        )}

                        {isPenalty && (
                          <p className="text-xs text-red-400 mt-1">
                            Late cancellation penalty · {txn.date}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
