import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StarRating } from './StarRating';

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  productName: string;
  productImage: string;
  date: string;
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const initials = review.customerName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="p-4 border-card-border hover-elevate" data-testid={`review-card-${review.id}`}>
      <div className="flex gap-4">
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
          <img
            src={review.productImage}
            alt={review.productName}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium" data-testid={`reviewer-name-${review.id}`}>
                  {review.customerName}
                </p>
                <p className="text-xs text-muted-foreground">{review.date}</p>
              </div>
            </div>
            <StarRating rating={review.rating} showCount={false} size="sm" />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {review.comment}
          </p>
          <p className="text-xs text-muted-foreground">
            Product: {review.productName}
          </p>
        </div>
      </div>
    </Card>
  );
}
