import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Search,
  Bookmark,
  UserCircle2,
  LayoutDashboard,
  CalendarDays,
  TrendingUp,
  MapPin,
  ArrowLeftRight,
  ChevronDown,
  Bell,
  Settings,
} from 'lucide-react';
import { useRole } from '@/lib/role-context';
import { useAppLocation } from '@/lib/location-context';
import { LocationPicker } from '@/components/LocationPicker';

const customerNav = [
  { path: '/', label: 'Home', Icon: Home },
  { path: '/search', label: 'Search Workers', Icon: Search },
  { path: '/bookings', label: 'My Bookings', Icon: Bookmark },
  { path: '/customer-notifications', label: 'Notifications', Icon: Bell, badge: 2 },
  { path: '/customer-profile', label: 'Profile', Icon: UserCircle2 },
];

const workerNav = [
  { path: '/', label: 'Job Requests', Icon: LayoutDashboard },
  { path: '/worker-schedule', label: 'Schedule', Icon: CalendarDays },
  { path: '/profile', label: 'Earnings', Icon: TrendingUp },
  { path: '/radius-setting', label: 'Settings', Icon: Settings },
];

export function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { role, setRole, isWorker, setIsWorker } = useRole();
  const { location, setLocation, showPicker, setShowPicker } = useAppLocation();
  const navItems = role === 'worker' ? workerNav : customerNav;

  return (
    <>
      <aside className="hidden md:flex md:flex-col fixed inset-y-0 left-0 w-64 bg-white border-r border-stone-200 z-40">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-stone-100">
          <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">SC</span>
          </div>
          <div>
            <p className="font-display font-semibold text-stone-900 leading-tight">Sahayog</p>
            <p className="text-xs text-stone-400">Cooperative Platform</p>
          </div>
        </div>

        {/* Location */}
        <button
          onClick={() => setShowPicker(true)}
          className="flex items-center gap-2 px-5 py-3 hover:bg-stone-50 transition-colors border-b border-stone-100 group"
        >
          <MapPin size={14} className="text-brand flex-shrink-0" />
          <span className="text-sm font-medium text-stone-700 flex-1 text-left truncate">{location.area}</span>
          <ChevronDown size={13} className="text-stone-400 group-hover:text-stone-600 transition-colors" />
        </button>

        {/* Role switcher */}
        <div className="px-4 py-3 border-b border-stone-100">
          <div className="flex bg-stone-100 rounded-xl p-0.5">
            <button
              onClick={() => { setRole('customer'); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'customer' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              👤 Customer
            </button>
            <button
              onClick={() => {
                if (isWorker) setRole('worker');
                else navigate('/onboarding');
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'worker' ? 'bg-brand text-white shadow-sm' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              👷 Worker
            </button>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {navItems.map(({ path, label, Icon, badge }: any) => {
            const active = pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                  active
                    ? 'bg-brand-light text-brand font-semibold'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <Icon size={18} strokeWidth={active ? 2.5 : 1.8} className="flex-shrink-0" />
                <span className="text-sm flex-1">{label}</span>
                {badge && (
                  <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-stone-100 px-3 py-3 space-y-1">
          {role === 'customer' ? (
            <button
              onClick={() => navigate('/onboarding')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-amber-warm text-white hover:opacity-90 transition-opacity"
            >
              <span className="text-base">👷</span>
              <span className="text-sm font-semibold">Join as Worker</span>
            </button>
          ) : (
            <button
              onClick={() => { setRole('customer'); setIsWorker(false); navigate('/'); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-stone-500 hover:bg-stone-50 transition-colors"
            >
              <ArrowLeftRight size={16} />
              <span className="text-sm font-medium">Switch to Customer</span>
            </button>
          )}
        </div>
      </aside>

      {/* Location picker (portal-like) */}
      {showPicker && (
        <LocationPicker
          current={location}
          onSelect={(loc) => { setLocation(loc); setShowPicker(false); }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </>
  );
}
