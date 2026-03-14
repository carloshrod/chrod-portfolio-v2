import ReviewCard from "./ReviewCard";
import type { Review } from "./review.types";

interface Props {
  reviews: readonly Review[];
}

const ReviewsCarousel = ({ reviews }: Props) => {
  const doubled = [...reviews, ...reviews];

  return (
    <div
      className="group overflow-hidden"
      aria-label="Client testimonials carousel"
      role="region"
    >
      <div className="animate-marquee flex w-max gap-6 group-hover:[animation-play-state:paused]">
        {doubled.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsCarousel;
