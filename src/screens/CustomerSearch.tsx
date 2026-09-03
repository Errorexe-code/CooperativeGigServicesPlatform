import { useState } from 'react';
import { Search, SlidersHorizontal, Zap } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { WorkerCard } from '@/components/WorkerCard';
import { FilterSheet, DEFAULT_FILTERS, activeFilterCount } from '@/components/FilterSheet';
import type { FilterState } from '@/components/FilterSheet';
import { workers, services } from '@/lib/mock-data';

function parseDistance(d: string): number {
  return parseFloat(d.replace(/[^\d.]/g, '')) || 99;
}

export function CustomerSearch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSkill = searchParams.get('skill') ?? 'all';

  const [query, setQuery] = useState('');
  const [activeSkill, setActiveSkill] = useState(initialSkill);
  const [urgentMode, setUrgentMode] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ ...DEFAULT_FILTERS });

  const filterCount = activeFilterCount(filters);

  const filtered = workers.filter((w) => {
    // Text search
    if (query.trim() && !w.name.toLowerCase().includes(query.toLowerCase()) && !w.skill.toLowerCase().includes(query.toLowerCase())) return false;

    // Mobile chip / desktop sidebar skill
    if (activeSkill !== 'all' && w.skill.toLowerCase() !== activeSkill.toLowerCase() && w.skill.toLowerCase() !== activeSkill) return false;

    // Sheet: skill multi-select (overrides chip if any selected)
    if (filters.skills.length > 0 && !filters.skills.some((sid) => w.skill.toLowerCase() === services.find((s) => s.id === sid)?.name.toLowerCase())) return false;

    // Sheet: distance
    if (parseDistance(w.distance) > filters.maxDistance) return false;

    // Sheet: rating
    if (filters.minRating > 0 && w.rating < filters.minRating) return false;

    // Sheet: vouches
    if (filters.minVouches > 0 && w.vouches < filters.minVouches) return false;

    // Sheet: available now
    if (filters.availableNow && !w.availableNow) return false;

    // Urgent mode — also requires availableNow
    if (urgentMode && !w.availableNow) return false;

    return true;
  });

  const handleBook = (workerId: string) => {
    const params = new URLSearchParams({ workerId });
    if (urgentMode) params.set('urgent', 'true');
    navigate(`/booking-confirm?${params.toString()}`);
  };

  const clearAll = () => {
    setFilters({ ...DEFAULT_FILTERS });
    setActiveSkill('all');
    setQuery('');
    setUrgentMode(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      {/* Header */}
      <header className="px-4 md:px-8 pt-5 md:pt-8 pb-3 md:pb-4 flex-shrink-0">
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-stone-900 mb-3">Find a worker</h1>

        {/* Search + filters row */}
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2.5 bg-white border border-stone-200 rounded-2xl px-4 py-3 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/10 transition-all">
            <Search size={16} className="text-stone-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by name or skill..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-stone-900 placeholder-stone-400 focus:outline-none"
            />
          </div>

          {/* Filters button */}
          <button
            onClick={() => setShowFilters(true)}
            className={`flex items-center gap-2 px-4 rounded-2xl border font-semibold text-sm transition-colors flex-shrink-0 ${
              filterCount > 0
                ? 'bg-brand border-brand text-white'
                : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            <SlidersHorizontal size={15} />
            <span className="hidden sm:inline">Filters</span>
            {filterCount > 0 && (
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                filterCount > 0 ? 'bg-white text-brand' : 'bg-brand text-white'
              }`}>
                {filterCount}
              </span>
            )}
          </button>
        </div>

        {/* Urgent booking toggle */}
        <button
          onClick={() => setUrgentMode((v) => !v)}
          className={`mt-2.5 w-full flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-left transition-all ${
            urgentMode ? 'border-coop bg-coop-light' : 'border-stone-200 bg-white hover:border-stone-300'
          }`}
        >
          <Zap
            size={16}
            className={urgentMode ? 'text-coop flex-shrink-0' : 'text-stone-400 flex-shrink-0'}
            fill={urgentMode ? 'currentColor' : 'none'}
          />
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold ${urgentMode ? 'text-coop' : 'text-stone-700'}`}>Urgent booking</p>
            {urgentMode && (
              <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                Urgent bookings are matched faster and include a{' '}
                <span className="font-semibold text-coop">15% priority fee</span>, of which 60% goes directly to the
                worker for short-notice availability.
              </p>
            )}
          </div>
          <div className={`w-10 h-6 rounded-full transition-colors relative flex-shrink-0 ${urgentMode ? 'bg-coop' : 'bg-stone-200'}`}>
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${urgentMode ? 'left-5' : 'left-1'}`} />
          </div>
        </button>

        {/* Active filter summary chips */}
        {filterCount > 0 && (
          <div className="flex items-center gap-2 mt-2.5 flex-wrap">
            {filters.skills.length > 0 && (
              <span className="text-xs bg-brand-light text-brand font-medium px-2.5 py-1 rounded-full">
                {filters.skills.length} skill{filters.skills.length > 1 ? 's' : ''}
              </span>
            )}
            {filters.maxDistance < 20 && (
              <span className="text-xs bg-brand-light text-brand font-medium px-2.5 py-1 rounded-full">
                ≤ {filters.maxDistance} km
              </span>
            )}
            {filters.minRating > 0 && (
              <span className="text-xs bg-brand-light text-brand font-medium px-2.5 py-1 rounded-full">
                {filters.minRating}+ ★
              </span>
            )}
            {filters.minVouches > 0 && (
              <span className="text-xs bg-brand-light text-brand font-medium px-2.5 py-1 rounded-full">
                {filters.minVouches}+ vouches
              </span>
            )}
            {filters.availableNow && (
              <span className="text-xs bg-brand-light text-brand font-medium px-2.5 py-1 rounded-full">
                Available now
              </span>
            )}
            <button onClick={() => setFilters({ ...DEFAULT_FILTERS })} className="text-xs text-stone-400 font-medium underline active:opacity-70">
              Clear all
            </button>
          </div>
        )}
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Desktop filter sidebar — condensed, defers detail to sheet */}
        <aside className="hidden md:flex md:flex-col md:w-56 md:flex-shrink-0 px-8 pb-10 border-r border-stone-200 bg-white">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-3">Service type</p>
          <div className="space-y-1">
            <button
              onClick={() => setActiveSkill('all')}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${activeSkill === 'all' ? 'bg-brand-light text-brand' : 'text-stone-600 hover:bg-stone-50'}`}
            >
              All services
            </button>
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSkill(activeSkill === s.id ? 'all' : s.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors ${activeSkill === s.id ? 'bg-brand-light text-brand' : 'text-stone-600 hover:bg-stone-50'}`}
              >
                <span>{s.emoji}</span>
                <span>{s.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-stone-100">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-3">More filters</p>
            <button
              onClick={() => setShowFilters(true)}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors"
            >
              <SlidersHorizontal size={14} />
              <span>Open filter panel</span>
              {filterCount > 0 && (
                <span className="ml-auto w-5 h-5 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center">
                  {filterCount}
                </span>
              )}
            </button>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Mobile skill chips */}
          <div className="md:hidden flex gap-2 px-4 overflow-x-auto scrollbar-hide pb-3 flex-shrink-0">
            <button
              onClick={() => setActiveSkill('all')}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeSkill === 'all' ? 'bg-brand text-white shadow-sm' : 'bg-white text-stone-600 border border-stone-200'}`}
            >
              All
            </button>
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSkill(activeSkill === s.id ? 'all' : s.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all ${activeSkill === s.id ? 'bg-brand text-white shadow-sm' : 'bg-white text-stone-600 border border-stone-200'}`}
              >
                <span>{s.emoji}</span>
                <span>{s.name}</span>
              </button>
            ))}
          </div>

          <main className="px-4 md:px-8 pb-24 md:pb-10 overflow-y-auto">
            {urgentMode && (
              <div className="mb-3 flex items-center gap-2 px-1">
                <Zap size={13} className="text-coop" fill="currentColor" />
                <span className="text-xs text-stone-500 font-medium">
                  Showing workers available for urgent same-day booking
                </span>
              </div>
            )}

            <p className="text-xs text-stone-400 mb-3 px-1">
              {filtered.length} worker{filtered.length !== 1 ? 's' : ''} found
            </p>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filtered.map((worker) => (
                  <WorkerCard
                    key={worker.id}
                    worker={worker}
                    variant="search"
                    urgentMode={urgentMode}
                    onBook={() => handleBook(worker.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">{urgentMode ? '⚡' : '🔍'}</p>
                <p className="font-semibold text-stone-700">No workers match these filters</p>
                <p className="text-sm text-stone-400 mt-1 mb-4">
                  {urgentMode ? 'Try turning off urgent mode' : 'Adjust your filters to see more results'}
                </p>
                <button
                  onClick={clearAll}
                  className="px-5 py-2.5 rounded-2xl border border-stone-300 text-stone-600 text-sm font-medium active:bg-stone-100 hover:bg-stone-50 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <BottomNav />

      {showFilters && (
        <FilterSheet
          initial={filters}
          onApply={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
}
