import {
  ChevronRight,
  Bookmark,
  Bell,
  HelpCircle,
  FileText,
  LogOut,
  Shield,
  Edit3,
  MapPin,
  Phone,
  Star,
  X,
  Check,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { customerBookings } from '@/lib/mock-data';

const defaultCustomer = {
  name: 'Anita Gupta',
  initials: 'AG',
  phone: '+91 98765 43210',
  location: 'Koramangala, Bangalore',
  memberSince: 'January 2024',
  vouchesGiven: 3,
};

const avatarColors = { bg: '#DBEAFE', text: '#1D4ED8' };

export function CustomerProfile() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [customer, setCustomer] = useState(defaultCustomer);
  const [editForm, setEditForm] = useState({ name: customer.name, phone: customer.phone, location: customer.location });

  const completedBookings = customerBookings.filter((b) => b.status === 'completed').length;

  const openEdit = () => {
    setEditForm({ name: customer.name, phone: customer.phone, location: customer.location });
    setShowEditModal(true);
  };

  const saveEdit = () => {
    const initials = editForm.name.trim().split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
    setCustomer((c) => ({ ...c, ...editForm, initials }));
    setShowEditModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      {/* Header */}
      <header className="px-4 md:px-8 pt-6 md:pt-8 pb-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-1">
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-stone-900">My Profile</h1>
          <button
            onClick={openEdit}
            className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center active:bg-stone-50 hover:bg-stone-50 transition-colors"
          >
            <Edit3 size={16} className="text-stone-600" />
          </button>
        </div>
      </header>

      <main className="flex-1 pb-24 md:pb-10">
        <div className="md:grid md:grid-cols-[340px,1fr] md:gap-6 md:px-8 px-4 space-y-4 md:space-y-0">

          {/* Left: Profile identity */}
          <div className="space-y-4">
            {/* Profile card */}
            <div className="bg-white rounded-3xl border border-stone-100 p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0 ring-4 ring-stone-100"
                  style={{ backgroundColor: avatarColors.bg, color: avatarColors.text }}
                >
                  {customer.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-xl font-semibold text-stone-900 leading-tight">
                    {customer.name}
                  </h2>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Phone size={12} className="text-stone-400" />
                    <span className="text-sm text-stone-500">{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <MapPin size={12} className="text-stone-400" />
                    <span className="text-sm text-stone-500 truncate">{customer.location}</span>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-stone-50">
                {[
                  { label: 'Bookings', value: customerBookings.length, icon: '📋' },
                  { label: 'Completed', value: completedBookings, icon: '✅' },
                  { label: 'Vouches given', value: customer.vouchesGiven, icon: '🤝' },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="flex-1 text-center">
                    <p className="text-lg">{icon}</p>
                    <p className="font-bold text-stone-900 text-lg leading-tight">{value}</p>
                    <p className="text-xs text-stone-400 leading-tight mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-3 bg-brand-light rounded-2xl px-4 py-3 border border-brand/10">
              <Shield size={18} className="text-brand flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-brand">Verified Community Member</p>
                <p className="text-xs text-brand mt-0.5">Member since {customer.memberSince}</p>
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} fill="#2F6B57" className="text-brand" />
                ))}
              </div>
            </div>

            {/* Join as worker promo */}
            <button
              onClick={() => navigate('/onboarding')}
              className="w-full bg-amber-warm rounded-2xl p-4 flex items-center gap-3 active:opacity-90 hover:opacity-90 transition-opacity text-left"
            >
              <span className="text-3xl">👷</span>
              <div className="flex-1">
                <p className="font-semibold text-white text-sm">Earn with Sahayog</p>
                <p className="text-amber-100 text-xs mt-0.5">Join as a worker and get community-verified jobs</p>
              </div>
              <ChevronRight size={18} className="text-white/70" />
            </button>
          </div>

          {/* Right: Menu sections */}
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-2 px-1">Activity</p>
              <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
                <MenuRow
                  Icon={Bookmark}
                  label="My Bookings"
                  sub={`${customerBookings.length} total bookings`}
                  onClick={() => navigate('/bookings')}
                />
                <div className="h-px bg-stone-50 mx-4" />
                <MenuRow
                  Icon={Bell}
                  label="Notifications"
                  sub="Booking updates & alerts"
                  badge="2"
                  onClick={() => navigate('/customer-notifications')}
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-2 px-1">Support</p>
              <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
                <MenuRow
                  Icon={HelpCircle}
                  label="Help & Support"
                  sub="FAQs, contact us"
                  onClick={() => {}}
                />
                <div className="h-px bg-stone-50 mx-4" />
                <MenuRow
                  Icon={FileText}
                  label="Terms & Conditions"
                  sub="Platform policies & cooperative rules"
                  onClick={() => navigate('/terms')}
                  highlight
                />
              </div>
            </div>

            {/* Sign out */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-red-200 text-red-500 text-sm font-semibold active:bg-red-50 hover:bg-red-50 transition-colors"
            >
              <LogOut size={16} />
              Sign out
            </button>

            <p className="text-center text-xs text-stone-400 pb-2">Sahayog Cooperative Society · v1.0.0</p>
          </div>
        </div>
      </main>

      <BottomNav />

      {/* Edit profile modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowEditModal(false)} />
          <div
            className="relative w-full max-w-sm mx-4 bg-white rounded-t-3xl md:rounded-3xl p-6 pb-10 md:pb-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 active:bg-stone-200"
            >
              <X size={16} />
            </button>

            <h3 className="font-display text-xl font-semibold text-stone-900 mb-5">Edit profile</h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5 block">Full name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-2xl border border-stone-200 bg-stone-50 text-stone-900 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5 block">Phone number</label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-2xl border border-stone-200 bg-stone-50 text-stone-900 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5 block">Location</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm((f) => ({ ...f, location: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-2xl border border-stone-200 bg-stone-50 text-stone-900 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 text-sm"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 py-3 rounded-2xl border border-stone-200 text-stone-600 font-medium text-sm active:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                disabled={!editForm.name.trim()}
                className="flex-1 py-3 rounded-2xl bg-brand text-white font-semibold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-40"
              >
                <Check size={15} strokeWidth={2.5} />
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout confirmation modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)} />
          <div className="relative w-full max-w-sm mx-4 bg-white rounded-3xl p-6">
            <h3 className="font-display text-xl font-semibold text-stone-900 text-center mb-2">Sign out?</h3>
            <p className="text-stone-500 text-sm text-center mb-6">
              You can always sign back in with your phone number.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 rounded-2xl border border-stone-200 text-stone-600 font-medium text-sm active:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-semibold text-sm active:scale-95 transition-transform"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuRow({
  Icon,
  label,
  sub,
  badge,
  onClick,
  highlight,
}: {
  Icon: React.ElementType;
  label: string;
  sub?: string;
  badge?: string;
  onClick: () => void;
  highlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-stone-50 hover:bg-stone-50 transition-colors text-left"
    >
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
          highlight ? 'bg-brand-light' : 'bg-stone-100'
        }`}
      >
        <Icon size={16} className={highlight ? 'text-brand' : 'text-stone-500'} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${highlight ? 'text-brand' : 'text-stone-900'}`}>{label}</p>
        {sub && <p className="text-xs text-stone-400 mt-0.5 truncate">{sub}</p>}
      </div>
      {badge && (
        <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          {badge}
        </span>
      )}
      <ChevronRight size={16} className="text-stone-300 flex-shrink-0" />
    </button>
  );
}
