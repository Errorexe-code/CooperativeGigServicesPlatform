import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  size?: number;
}

export function StarRating({ value, onChange, size = 32 }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hovered || value);
        return (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(star)}
            className="transition-transform active:scale-90"
            style={{ padding: 2 }}
          >
            <Star
              size={size}
              fill={filled ? '#F2B94B' : 'none'}
              className={filled ? 'text-amber-400' : 'text-stone-300'}
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </div>
  );
}
