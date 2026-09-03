import { Home, Search, Bookmark, LayoutDashboard, CalendarDays, TrendingUp, UserCircle2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useRole } from '@/lib/role-context';

const customerNav = [
  { path: '/', label: 'Home', Icon: Home },
  { path: '/search', label: 'Search', Icon: Search },
  { path: '/bookings', label: 'Bookings', Icon: Bookmark },
  { path: '/customer-profile', label: 'Profile', Icon: UserCircle2 },
];

const workerNav = [
  { path: '/', label: 'Jobs', Icon: LayoutDashboard },
  { path: '/worker-schedule', label: 'Schedule', Icon: CalendarDays },
  { path: '/profile', label: 'Earnings', Icon: TrendingUp },
];

export function BottomNav() {
  const { pathname } = useLocation();
  const { role } = useRole();
  const navItems = role === 'worker' ? workerNav : customerNav;

  return (
    /* Hidden on md+ — sidebar takes over */
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-100 z-40">
      <div className="flex">
        {navItems.map(({ path, label, Icon }) => {
          const active = pathname === path;
          return (
            <Link
              key={`${role}-${path}`}
              to={path}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors ${
                active ? 'text-brand' : 'text-stone-400'
              }`}
            >
              <Icon size={21} strokeWidth={active ? 2.5 : 1.8} />
              <span className={`text-[9.5px] font-medium tracking-wide ${active ? 'text-brand' : 'text-stone-400'}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
