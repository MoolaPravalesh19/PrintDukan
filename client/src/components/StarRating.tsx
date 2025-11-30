import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  votes?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export function StarRating({ rating, votes, size = 'sm', showCount = true }: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1" data-testid="star-rating">
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={`${sizeClasses[size]} fill-amber-400 text-amber-400`}
          />
        ))}
        {hasHalfStar && (
          <StarHalf className={`${sizeClasses[size]} fill-amber-400 text-amber-400`} />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={`${sizeClasses[size]} text-muted-foreground/30`}
          />
        ))}
      </div>
      {showCount && (
        <span className="text-xs text-muted-foreground">
          {rating.toFixed(1)} {votes && `(${votes.toLocaleString()})`}
        </span>
      )}
    </div>
  );
}
