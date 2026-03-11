import type { Review } from "./review.types";
import { SourceBadge } from "./review.source";

const LinkedInIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 72 72"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M8 72h56a8 8 0 0 0 8-8V8a8 8 0 0 0-8-8H8a8 8 0 0 0-8 8v56a8 8 0 0 0 8 8Z"
      className="text-[#0A66C2]"
    />
    <path
      d="M62 62H51.3V43.8c0-4.4-.1-10-6.1-10-6.1 0-7 4.8-7 9.7V62H27.5V27h10.3v4.7h.1c1.4-2.7 4.9-5.6 10.1-5.6 10.8 0 12.8 7.1 12.8 16.4V62ZM16.3 22.3a6 6 0 1 1 0-12 6 6 0 0 1 0 12ZM21.7 62H10.8V27h10.9v35Z"
      fill="white"
    />
  </svg>
);

const StarRating = () => (
  <div
    className="flex items-center gap-0.5"
    aria-label="5 out of 5 stars"
    role="img"
  >
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-red-600/50"
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <figure className="flex w-80 shrink-0 flex-col gap-5 rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-red-600/30">
      <div className="flex shrink-0 items-center justify-between">
        {review.source === "workana" ? <StarRating /> : <span />}
        <SourceBadge review={review} />
      </div>

      <blockquote className="flex-1">
        <p className="text-sm leading-relaxed text-slate-400">
          &ldquo;{review.text}&rdquo;
        </p>
      </blockquote>

      <figcaption className="flex items-center gap-3 border-t border-border pt-5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600/20 text-xs font-bold text-red-400"
          aria-hidden="true"
        >
          {review.avatar}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-slate-200">
              {review.name}
            </p>
            {review.linkedinUrl && (
              <a
                href={review.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${review.name} on LinkedIn`}
                className="transition-opacity hover:opacity-80"
              >
                <LinkedInIcon />
              </a>
            )}
          </div>
          <p className="truncate text-xs text-slate-500">
            {review.companyLogo ? (
              <img
                src={review.companyLogo}
                alt={review.company}
                className="h-3.5 w-auto max-w-15 object-contain opacity-60"
              />
            ) : (
              <>
                {review.role} · {review.company}
              </>
            )}
          </p>
        </div>
      </figcaption>
    </figure>
  );
};

export default ReviewCard;
