import { useState } from 'react';
import { Bell, CheckCheck, Clock, ShieldCheck, Star, Leaf, CircleCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BackHeader } from '@/components/BackHeader';
import { BottomNav } from '@/components/BottomNav';
import { customerNotifs, type CustomerNotif, type NotifType } from '@/lib/mock-data';

const typeConfig: Record<
  NotifType,
  { Icon: React.ElementType; bg: string; color: string; emoji: string }
> = {
  reminder:         { Icon: Clock,        bg: '#FDF3DC', color: '#C4881A', emoji: '⏰' },
  booking_confirmed:{ Icon: CircleCheck,  bg: '#D0E6DE', color: '#2F6B57', emoji: '✅' },
  worker_matched:   { Icon: ShieldCheck,  bg: '#DBEAFE', color: '#1D4ED8', emoji: '🤝' },
  in_progress:      { Icon: Bell,         bg: '#F9E5DF', color: '#C8664B', emoji: '🔔' },
  completed:        { Icon: Star,         bg: '#FDF3DC', color: '#C4881A', emoji: '🎉' },
  vouch:            { Icon: ShieldCheck,  bg: '#D0E6DE', color: '#2F6B57', emoji: '💚' },
  promo:            { Icon: Leaf,         bg: '#D0E6DE', color: '#2F6B57', emoji: '🌱' },
};

function groupByTime(notifs: CustomerNotif[]) {
  const today: CustomerNotif[] = [];
  const yesterday: CustomerNotif[] = [];
  const earlier: CustomerNotif[] = [];
  for (const n of notifs) {
    if (n.time.includes('now') || n.time.includes('hr') || n.time === 'Today') today.push(n);
    else if (n.time === 'Yesterday') yesterday.push(n);
    else earlier.push(n);
  }
  return { today, yesterday, earlier };
}

export function CustomerNotifications() {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState(customerNotifs);

  const unreadCount = notifs.filter((n) => !n.read).length;
  const groups = groupByTime(notifs);

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) =>
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <BackHeader
        title="Notifications"
        subtitle={unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
        action={
          unreadCount > 0 ? (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-xs font-semibold text-brand active:opacity-70 hover:opacity-70 transition-opacity"
            >
              <CheckCheck size={14} />
              Mark all read
            </button>
          ) : undefined
        }
      />

      <main className="flex-1 overflow-y-auto pb-24 md:pb-10 scrollbar-hide">
        <div className="max-w-2xl md:mx-auto">
          {notifs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-3 px-8 text-center">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-3xl">🔕</div>
              <p className="font-semibold text-stone-700">No notifications yet</p>
              <p className="text-sm text-stone-400">Booking updates, reminders and community news will appear here.</p>
            </div>
          ) : (
            <>
              {[
                { label: 'Today', items: groups.today },
                { label: 'Yesterday', items: groups.yesterday },
                { label: 'Earlier', items: groups.earlier },
              ].map(
                ({ label, items }) =>
                  items.length > 0 && (
                    <section key={label}>
                      <p className="px-4 md:px-6 pt-4 pb-2 text-xs font-semibold text-stone-400 uppercase tracking-wide">
                        {label}
                      </p>
                      <div className="space-y-1 px-4 md:px-6">
                        {items.map((notif) => (
                          <NotifCard
                            key={notif.id}
                            notif={notif}
                            onRead={() => markRead(notif.id)}
                            onAction={(path) => { markRead(notif.id); navigate(path); }}
                          />
                        ))}
                      </div>
                    </section>
                  )
              )}
              <p className="text-center text-xs text-stone-300 py-6">— End of notifications —</p>
            </>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

function NotifCard({
  notif,
  onRead,
  onAction,
}: {
  notif: CustomerNotif;
  onRead: () => void;
  onAction: (path: string) => void;
}) {
  const cfg = typeConfig[notif.type];

  return (
    <div
      onClick={onRead}
      className={`relative rounded-2xl p-4 border transition-colors cursor-pointer active:scale-[0.99] ${
        notif.read ? 'bg-white border-stone-100' : 'bg-white border-brand/20 shadow-sm'
      }`}
    >
      {!notif.read && (
        <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-brand" />
      )}

      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ backgroundColor: cfg.bg }}
        >
          {cfg.emoji}
        </div>

        <div className="flex-1 min-w-0 pr-4">
          <p className={`text-sm leading-tight ${notif.read ? 'font-medium text-stone-700' : 'font-semibold text-stone-900'}`}>
            {notif.title}
          </p>
          <p className="text-xs text-stone-500 mt-1 leading-relaxed">{notif.body}</p>
          <p className="text-[10px] text-stone-400 mt-1.5 font-medium">{notif.time}</p>

          {notif.actionLabel && notif.actionPath && (
            <button
              onClick={(e) => { e.stopPropagation(); onAction(notif.actionPath!); }}
              className="mt-2.5 flex items-center gap-1 text-xs font-semibold text-brand active:opacity-70 hover:opacity-70 transition-opacity"
            >
              {notif.actionLabel}
              <ArrowRight size={11} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
