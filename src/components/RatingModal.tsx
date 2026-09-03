import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Avatar } from './Avatar';
import { StarRating } from './StarRating';

interface RatingModalProps {
  subjectName: string;
  subjectInitials: string;
  subjectRole: 'worker' | 'customer';
  skillLabel?: string;
  onClose: () => void;
  onSubmit?: (rating: number, comment: string) => void;
}

const LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];

export function RatingModal({
  subjectName,
  subjectInitials,
  subjectRole,
  skillLabel,
  onClose,
  onSubmit,
}: RatingModalProps) {
  const [step, setStep] = useState<'input' | 'done'>('input');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const prompt =
    subjectRole === 'worker'
      ? `How was your experience with ${subjectName}?`
      : `How was ${subjectName} as a customer?`;

  const handleSubmit = () => {
    onSubmit?.(rating, comment);
    setStep('done');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-[420px] bg-white rounded-t-3xl p-6 pb-10 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 active:bg-stone-200"
        >
          <X size={16} />
        </button>

        {step === 'input' ? (
          <>
            <div className="flex flex-col items-center text-center pt-2">
              <Avatar name={subjectName} initials={subjectInitials} size="lg" />
              <h2 className="font-display text-xl font-semibold text-stone-900 mt-3 mb-1">
                {prompt}
              </h2>
              {skillLabel && (
                <p className="text-sm text-stone-500 mb-4">{skillLabel}</p>
              )}
            </div>

            <div className="flex flex-col items-center gap-2 my-4">
              <StarRating value={rating} onChange={setRating} size={36} />
              {rating > 0 && (
                <span className="text-sm font-semibold text-amber-600">{LABELS[rating]}</span>
              )}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment (optional)"
              rows={3}
              className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 resize-none focus:outline-none focus:border-brand bg-stone-50"
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl border border-stone-200 text-stone-600 font-medium text-sm active:bg-stone-50"
              >
                Skip
              </button>
              <button
                onClick={handleSubmit}
                disabled={rating === 0}
                className="flex-1 py-3 rounded-2xl bg-brand text-white font-semibold text-sm active:scale-95 transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit rating
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center mb-4">
              <Check size={28} className="text-white" strokeWidth={3} />
            </div>
            <h2 className="font-display text-xl font-semibold text-stone-900 mb-2">
              Rating submitted!
            </h2>
            <div className="flex gap-0.5 mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className={`text-xl ${s <= rating ? 'text-amber-400' : 'text-stone-200'}`}>★</span>
              ))}
            </div>
            <p className="text-stone-500 text-sm">
              Thank you for rating {subjectName}. Your feedback helps the cooperative.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-8 py-3 rounded-2xl bg-brand text-white font-semibold text-sm active:scale-95 transition-transform"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
