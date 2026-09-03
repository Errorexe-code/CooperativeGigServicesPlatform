import { useState } from 'react';
import { getAvatarColor } from '@/lib/utils';

interface AvatarProps {
  name: string;
  initials: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  imageUrl?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
};

export function Avatar({ name, initials, size = 'md', className = '', imageUrl }: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const colors = getAvatarColor(name);

  if (imageUrl && !imgError) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover flex-shrink-0 ${className}`}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-semibold flex-shrink-0 ${className}`}
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {initials}
    </div>
  );
}

interface VouchStackProps {
  vouchers: Array<{ name: string; initials: string }>;
  count: number;
}

export function VouchStack({ vouchers, count }: VouchStackProps) {
  const visible = vouchers.slice(0, 4);
  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {visible.map((v, i) => {
          const colors = getAvatarColor(v.name);
          return (
            <div
              key={i}
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 border-white"
              style={{ backgroundColor: colors.bg, color: colors.text }}
            >
              {v.initials}
            </div>
          );
        })}
      </div>
      <span className="text-sm text-stone-600 font-medium">{count} community vouches</span>
    </div>
  );
}
