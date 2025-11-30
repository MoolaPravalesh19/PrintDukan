import { ReviewCard, Review } from './ReviewCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface ReviewSectionProps {
  reviews: Review[];
}

export function ReviewSection({ reviews }: ReviewSectionProps) {
  return (
    <section className="py-12" data-testid="review-section">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl">
          Customer Reviews
        </h2>
        <p className="mb-8 text-center text-muted-foreground">
          See what our customers are saying
        </p>
        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-4">
            {reviews.map((review) => (
              <div key={review.id} className="w-80 flex-shrink-0">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
