import { MapPin, Bell, Plus, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { WorkerCard } from '@/components/WorkerCard';
import { WorkerHomeScreen } from '@/screens/WorkerHomeScreen';
import { LocationPicker } from '@/components/LocationPicker';
import { useRole } from '@/lib/role-context';
import { useAppLocation } from '@/lib/location-context';
import { workers, services } from '@/lib/mock-data';

export function HomeScreen() {
  const navigate = useNavigate();
  const { role, setRole, isWorker } = useRole();
  const { location, setLocation, showPicker, setShowPicker } = useAppLocation();

  if (role === 'worker') return <WorkerHomeScreen />;

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      {/* Top bar — mobile only (desktop uses sidebar) */}
      <header className="md:hidden flex items-center justify-between px-4 pt-5 pb-3 flex-shrink-0">
        <button
          onClick={() => setShowPicker(true)}
          className="flex items-center gap-1.5 text-stone-700 active:opacity-70"
        >
          <MapPin size={16} className="text-brand flex-shrink-0" />
          <span className="text-sm font-semibold truncate max-w-[150px]">{location.area}</span>
          <ChevronDown size={12} className="text-stone-400" />
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/customer-notifications')}
            className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center relative active:bg-stone-50"
          >
            <Bell size={16} className="text-stone-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </button>
          <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center">
            <span className="text-white text-xs font-bold">SC</span>
          </div>
        </div>
      </header>

      {/* Desktop page header */}
      <div className="hidden md:flex items-center justify-between px-8 pt-8 pb-2">
        <div>
          <h1 className="font-display text-3xl font-semibold text-stone-900">
            Your community, <span className="text-brand">at your service.</span>
          </h1>
          <p className="text-stone-500 mt-1">
            Trusted, vouched workers near{' '}
            <button onClick={() => setShowPicker(true)} className="text-brand font-semibold underline decoration-dashed underline-offset-2 hover:opacity-75 transition-opacity">
              {location.area}
            </button>
          </p>
        </div>
        <button
          onClick={() => navigate('/customer-notifications')}
          className="relative w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
        >
          <Bell size={18} className="text-stone-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>
      </div>

      {/* Mobile role switcher */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex bg-stone-100 rounded-2xl p-1">
          <button
            onClick={() => setRole('customer')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              role === 'customer' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
            }`}
          >
            👤 Customer
          </button>
          {isWorker && (
            <button
              onClick={() => setRole('worker')}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-stone-500 transition-all active:bg-stone-200"
            >
              👷 Worker
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 pb-24 md:pb-10">

        {/* Mobile hero */}
        <div className="md:hidden px-4 pb-5">
          <h1 className="font-display text-3xl font-semibold text-stone-900 leading-tight">
            Your community,<br /><span className="text-brand">at your service.</span>
          </h1>
          <p className="text-stone-500 text-sm mt-1.5">
            Trusted, vouched workers near{' '}
            <button onClick={() => setShowPicker(true)} className="text-brand font-semibold underline decoration-dashed underline-offset-2">
              {location.area}
            </button>
          </p>
        </div>

        {/* Desktop: 2-col layout */}
        <div className="md:grid md:grid-cols-[300px,1fr] md:gap-0 md:px-0">

          {/* Left column — Services + banner */}
          <div className="md:border-r md:border-stone-200 md:bg-white md:min-h-full">

            {/* Services */}
            <div className="md:px-6 md:pt-6">
              <div className="flex items-center justify-between px-4 md:px-0 mb-3">
                <h2 className="font-semibold text-stone-900 text-base">Services</h2>
                <button className="text-xs text-brand font-medium">See all</button>
              </div>

              {/* Mobile: horizontal scroll */}
              <div className="md:hidden flex gap-3 px-4 overflow-x-auto scrollbar-hide pb-1">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => navigate(`/search?skill=${service.id}`)}
                    className="flex flex-col items-center gap-2 flex-shrink-0 active:scale-95 transition-transform"
                  >
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-sm" style={{ backgroundColor: service.bgColor }}>
                      {service.emoji}
                    </div>
                    <span className="text-xs font-medium text-stone-700 text-center leading-tight w-16">{service.name}</span>
                  </button>
                ))}
              </div>

              {/* Desktop: grid */}
              <div className="hidden md:grid grid-cols-3 gap-2">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => navigate(`/search?skill=${service.id}`)}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-stone-50 active:scale-95 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: service.bgColor }}>
                      {service.emoji}
                    </div>
                    <span className="text-xs font-medium text-stone-700 text-center leading-tight">{service.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trust banner */}
            <div className="mx-4 md:mx-6 mt-5 mb-5 rounded-2xl bg-brand p-4 flex items-center gap-3">
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">Community-verified</p>
                <p className="text-white/70 text-xs mt-0.5">Every worker vouched by real neighbors</p>
              </div>
              <div className="text-3xl">🤝</div>
            </div>

            {/* Desktop-only: quick stats */}
            <div className="hidden md:block px-6 pb-6 space-y-2">
              {[
                { emoji: '👥', label: 'Active workers', value: '247' },
                { emoji: '✅', label: 'Jobs completed', value: '1,842' },
                { emoji: '⭐', label: 'Avg. rating', value: '4.8' },
              ].map(({ emoji, label, value }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <span>{emoji}</span>
                    <span className="text-sm text-stone-600">{label}</span>
                  </div>
                  <span className="font-bold text-brand text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — Workers near you */}
          <div className="px-4 md:px-8 md:pt-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="font-semibold text-stone-900 text-base">Workers near you</h2>
              <button className="text-xs text-brand font-medium" onClick={() => navigate('/search')}>View all</button>
            </div>

            {/* Mobile: stacked list */}
            <div className="md:hidden flex flex-col gap-3">
              {workers.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} variant="list" />
              ))}
            </div>

            {/* Desktop: 2-col grid */}
            <div className="hidden md:grid grid-cols-2 gap-4">
              {workers.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} variant="search" onBook={() => navigate(`/booking-confirm?workerId=${worker.id}`)} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile FAB */}
      {!isWorker && (
        <button
          onClick={() => navigate('/onboarding')}
          className="md:hidden fixed bottom-20 right-4 flex items-center gap-2 bg-amber-warm text-white px-4 py-3 rounded-2xl shadow-lg font-semibold text-sm active:scale-95 transition-transform z-30"
        >
          <Plus size={16} strokeWidth={2.5} />
          Join as worker
        </button>
      )}

      <BottomNav />

      {showPicker && (
        <LocationPicker
          current={location}
          onSelect={(loc) => { setLocation(loc); setShowPicker(false); }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}
