import { SourceBadge } from "./review.source";
import { LinkedInIcon, StarRatingIcon } from "./icons";
import type { Review } from "./review.types";

const StarRating = () => (
  <div
    className="flex items-center gap-0.5"
    aria-label="5 out of 5 stars"
    role="img"
  >
    <StarRatingIcon />
  </div>
);

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <figure className="group/link flex w-80 shrink-0 flex-col gap-5 rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-red-600/30">
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
