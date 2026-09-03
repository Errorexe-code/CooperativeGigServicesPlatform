import { ShieldCheck, MapPin, ChevronRight, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from './Avatar';
import type { Worker } from '@/lib/mock-data';

interface WorkerCardProps {
  worker: Worker;
  variant?: 'list' | 'search';
  urgentMode?: boolean;
  onBook?: () => void;
}

export function WorkerCard({ worker, variant = 'list', urgentMode = false, onBook }: WorkerCardProps) {
  const navigate = useNavigate();

  if (variant === 'search') {
    return (
      <div className={`bg-white rounded-2xl p-4 shadow-sm border transition-all ${
        urgentMode && worker.availableNow ? 'border-coop/30' : 'border-stone-100'
      }`}>
        <div className="flex items-start gap-3">
          <div className="relative">
            <Avatar name={worker.name} initials={worker.initials} size="lg" imageUrl={worker.imageUrl} />
            {worker.available && (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-stone-900 leading-tight">{worker.name}</p>
                  {worker.availableNow && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-coop-light text-coop flex-shrink-0">
                      <Zap size={9} fill="currentColor" />
                      Now
                    </span>
                  )}
                </div>
                <p className="text-sm text-stone-500 mt-0.5">
                  {worker.skillEmoji} {worker.skill}
                </p>
              </div>
              <div className="flex items-center gap-1 text-amber-500 flex-shrink-0">
                <Star size={12} fill="currentColor" />
                <span className="text-xs font-semibold text-stone-700">{worker.rating}</span>
                <span className="text-xs text-stone-400">({worker.ratingCount})</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1 text-xs text-stone-500">
                <ShieldCheck size={12} className="text-brand" />
                <span>{worker.vouches} vouches</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-stone-500">
                <MapPin size={12} />
                <span>{worker.distance}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => navigate(`/worker/${worker.id}`)}
            className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-sm font-medium transition-colors active:bg-stone-100"
          >
            View profile
          </button>
          <button
            onClick={onBook}
            disabled={!worker.available}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 ${
              urgentMode && worker.availableNow
                ? 'bg-coop text-white'
                : 'bg-brand text-white'
            }`}
          >
            {urgentMode && worker.availableNow && <Zap size={13} fill="currentColor" />}
            {worker.available ? 'Book now' : 'Unavailable'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => navigate(`/worker/${worker.id}`)}
      className="w-full flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-stone-100 shadow-sm active:bg-stone-50 transition-colors text-left"
    >
      <div className="relative">
        <Avatar name={worker.name} initials={worker.initials} size="md" imageUrl={worker.imageUrl} />
        {worker.available && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-stone-900 text-sm leading-tight truncate">{worker.name}</p>
          {worker.availableNow && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-coop-light text-coop flex-shrink-0">
              <Zap size={8} fill="currentColor" />
              Now
            </span>
          )}
        </div>
        <p className="text-xs text-stone-500 mt-0.5">
          {worker.skillEmoji} {worker.skill}
        </p>
        <div className="flex items-center gap-2.5 mt-1.5">
          <div className="flex items-center gap-1 text-xs text-stone-500">
            <ShieldCheck size={11} className="text-brand" />
            <span>{worker.vouches} vouches</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-stone-400">
            <MapPin size={11} />
            <span>{worker.distance}</span>
          </div>
        </div>
      </div>
      <ChevronRight size={18} className="text-stone-300 flex-shrink-0" />
    </button>
  );
}
