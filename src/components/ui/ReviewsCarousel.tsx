import { useEffect, useRef, useState } from "react";
import ReviewCard from "./ReviewCard";
import type { Review } from "../../types/review";

interface Props {
  reviews: readonly Review[];
}

const ReviewsCarousel = ({ reviews }: Props) => {
  const doubled = [...reviews, ...reviews];
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleTouchStart = () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      setPaused(true);
      resumeTimer.current = setTimeout(() => setPaused(false), 3000);
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    return () => el.removeEventListener("touchstart", handleTouchStart);
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden"
      aria-label="Client testimonials carousel"
      role="region"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="animate-marquee flex w-max gap-6"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {doubled.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsCarousel;
