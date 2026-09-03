export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

const AVATAR_COLORS = [
  { bg: '#D0E6DE', text: '#2F6B57' },
  { bg: '#DBEAFE', text: '#1D4ED8' },
  { bg: '#F9E5DF', text: '#A84D35' },
  { bg: '#FEE2E2', text: '#B91C1C' },
  { bg: '#FFEDD5', text: '#C2410C' },
  { bg: '#CFFAFE', text: '#0E7490' },
  { bg: '#FCE7F3', text: '#9D174D' },
];

export function getAvatarColor(name: string): { bg: string; text: string } {
  const idx = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
