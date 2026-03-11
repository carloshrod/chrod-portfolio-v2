import type React from "react";
import type { Review } from "./review.types";

type Source = NonNullable<Review["source"]>;

export const SOURCE_CONFIG: Record<
  Source,
  { label: string; className: string; icon: React.ReactNode }
> = {
  workana: {
    label: "Workana",
    className: "bg-[#1a0d2e] text-[#a855f7] ring-1 ring-[#a855f7]/30",
    icon: (
      <span
        className="text-[10px] font-black leading-none tracking-tighter"
        aria-hidden="true"
      >
        W
      </span>
    ),
  },
  linkedin: {
    label: "LinkedIn",
    className: "bg-[#061929] text-[#5ba4cf] ring-1 ring-[#5ba4cf]/30",
    icon: (
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  direct: {
    label: "Direct",
    className: "bg-[#111] text-slate-400 ring-1 ring-[#2a2a2a]",
    icon: (
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
};

export const SourceBadge = ({ review }: { review: Review }) => {
  if (!review.source) return null;
  const config = SOURCE_CONFIG[review.source];
  const className = `inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${config.className}`;

  if (review.sourceUrl) {
    return (
      <a
        href={review.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View review on ${config.label}`}
        className={`${className} transition-opacity hover:opacity-80`}
      >
        {config.icon}
        {config.label}
      </a>
    );
  }

  return (
    <span className={className}>
      {config.icon}
      {config.label}
    </span>
  );
};
