import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Navigation, X, Clock, ChevronRight } from 'lucide-react';

export interface Location {
  area: string;
  city: string;
  full: string;
}

const POPULAR: Location[] = [
  { area: 'Koramangala', city: 'Bangalore', full: 'Koramangala, Bangalore' },
  { area: 'Indiranagar', city: 'Bangalore', full: 'Indiranagar, Bangalore' },
  { area: 'HSR Layout', city: 'Bangalore', full: 'HSR Layout, Bangalore' },
  { area: 'BTM Layout', city: 'Bangalore', full: 'BTM Layout, Bangalore' },
  { area: 'Jayanagar', city: 'Bangalore', full: 'Jayanagar, Bangalore' },
  { area: 'JP Nagar', city: 'Bangalore', full: 'JP Nagar, Bangalore' },
  { area: 'Whitefield', city: 'Bangalore', full: 'Whitefield, Bangalore' },
  { area: 'Electronic City', city: 'Bangalore', full: 'Electronic City, Bangalore' },
  { area: 'Marathahalli', city: 'Bangalore', full: 'Marathahalli, Bangalore' },
  { area: 'Sarjapur Road', city: 'Bangalore', full: 'Sarjapur Road, Bangalore' },
  { area: 'Hebbal', city: 'Bangalore', full: 'Hebbal, Bangalore' },
  { area: 'Yelahanka', city: 'Bangalore', full: 'Yelahanka, Bangalore' },
];

const RECENT: Location[] = [
  { area: 'Koramangala', city: 'Bangalore', full: 'Koramangala, Bangalore' },
  { area: 'Indiranagar', city: 'Bangalore', full: 'Indiranagar, Bangalore' },
];

interface LocationPickerProps {
  current: Location;
  onSelect: (loc: Location) => void;
  onClose: () => void;
}

export function LocationPicker({ current, onSelect, onClose }: LocationPickerProps) {
  const [query, setQuery] = useState('');
  const [detecting, setDetecting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const filtered = POPULAR.filter(
    (l) =>
      l.full !== current.full &&
      (query === '' ||
        l.area.toLowerCase().includes(query.toLowerCase()) ||
        l.city.toLowerCase().includes(query.toLowerCase()))
  );

  const handleDetect = () => {
    setDetecting(true);
    setTimeout(() => {
      setDetecting(false);
      onSelect({ area: 'Koramangala', city: 'Bangalore', full: 'Koramangala, Bangalore' });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-[420px] bg-white rounded-t-3xl flex flex-col"
        style={{ maxHeight: '88vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 bg-stone-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-2 pb-4 flex-shrink-0">
          <div>
            <h2 className="font-display text-xl font-semibold text-stone-900">Change location</h2>
            <p className="text-xs text-stone-500 mt-0.5">Find workers in a different area</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center active:bg-stone-200"
          >
            <X size={15} className="text-stone-500" />
          </button>
        </div>

        {/* Search input */}
        <div className="px-5 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2.5 bg-stone-100 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-brand/20 focus-within:bg-white focus-within:border focus-within:border-brand/30 transition-all">
            <Search size={16} className="text-stone-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search area, locality…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-stone-900 placeholder-stone-400 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')}>
                <X size={14} className="text-stone-400" />
              </button>
            )}
          </div>
        </div>

        {/* Detect location */}
        <div className="px-5 pb-3 flex-shrink-0">
          <button
            onClick={handleDetect}
            disabled={detecting}
            className="w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 border-dashed border-brand/30 text-brand active:bg-brand-light transition-colors disabled:opacity-60"
          >
            {detecting ? (
              <>
                <div className="w-5 h-5 rounded-full border-2 border-brand border-t-transparent animate-spin flex-shrink-0" />
                <span className="text-sm font-semibold">Detecting your location…</span>
              </>
            ) : (
              <>
                <Navigation size={16} className="flex-shrink-0" />
                <span className="text-sm font-semibold">Use my current location</span>
              </>
            )}
          </button>
        </div>

        {/* Scrollable list */}
        <div className="overflow-y-auto scrollbar-hide px-5 pb-8 flex-1">
          {/* Current location */}
          <div className="mb-4 p-3.5 bg-brand-light rounded-2xl flex items-center gap-3 border border-brand/10">
            <div className="w-8 h-8 rounded-xl bg-brand flex items-center justify-center flex-shrink-0">
              <MapPin size={14} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-brand font-semibold uppercase tracking-wide mb-0.5">Current</p>
              <p className="text-sm font-semibold text-stone-900 truncate">{current.full}</p>
            </div>
          </div>

          {/* Recent locations — only when not searching */}
          {query === '' && (
            <>
              <SectionLabel Icon={Clock} label="Recent" />
              <div className="bg-white rounded-2xl border border-stone-100 divide-y divide-stone-50 mb-4 overflow-hidden">
                {RECENT.filter((r) => r.full !== current.full).map((loc) => (
                  <LocationRow key={loc.full} loc={loc} onSelect={onSelect} />
                ))}
                {RECENT.filter((r) => r.full !== current.full).length === 0 && (
                  <p className="px-4 py-3 text-sm text-stone-400">No recent locations</p>
                )}
              </div>
            </>
          )}

          {/* Popular / filtered results */}
          <SectionLabel Icon={MapPin} label={query ? 'Results' : 'Popular areas'} />
          {filtered.length > 0 ? (
            <div className="bg-white rounded-2xl border border-stone-100 divide-y divide-stone-50 overflow-hidden">
              {filtered.map((loc) => (
                <LocationRow key={loc.full} loc={loc} onSelect={onSelect} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-stone-400 text-sm">No areas found for "{query}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ Icon, label }: { Icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-2">
      <Icon size={12} className="text-stone-400" />
      <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide">{label}</p>
    </div>
  );
}

function LocationRow({ loc, onSelect }: { loc: Location; onSelect: (l: Location) => void }) {
  return (
    <button
      onClick={() => onSelect(loc)}
      className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-stone-50 text-left"
    >
      <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center flex-shrink-0">
        <MapPin size={14} className="text-stone-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-stone-900">{loc.area}</p>
        <p className="text-xs text-stone-400">{loc.city}</p>
      </div>
      <ChevronRight size={15} className="text-stone-300 flex-shrink-0" />
    </button>
  );
}
