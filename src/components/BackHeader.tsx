import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function BackHeader({ title, subtitle, action }: BackHeaderProps) {
  const navigate = useNavigate();
  return (
    <header className="flex items-center gap-3 px-4 md:px-8 py-3.5 bg-white border-b border-stone-100 sticky top-0 z-30">
      <button
        onClick={() => navigate(-1)}
        className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center active:bg-stone-200 hover:bg-stone-200 transition-colors flex-shrink-0"
      >
        <ArrowLeft size={18} className="text-stone-700" />
      </button>
      <div className="flex-1 min-w-0">
        <h1 className="font-semibold text-stone-900 leading-tight truncate">{title}</h1>
        {subtitle && <p className="text-xs text-stone-500 truncate">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}
