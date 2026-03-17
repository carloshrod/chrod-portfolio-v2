import { UserIcon } from "./icons";
import type { Review } from "../../types/review";

type KnownSource = "workana" | "direct";

const KNOWN_CONFIG: Record<
  KnownSource,
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
  direct: {
    label: "Direct",
    className: "bg-[#111] text-slate-400 ring-1 ring-[#2a2a2a]",
    icon: <UserIcon />,
  },
};

function getConfig(review: Review) {
  if (!review.source) return null;
  if (review.source === "workana" || review.source === "direct") {
    return KNOWN_CONFIG[review.source];
  }
  // custom or any unknown source
  return {
    label: review.sourceLabel ?? review.source,
    className: "bg-[#111] text-slate-400 ring-1 ring-[#2a2a2a]",
    icon: <UserIcon />,
  };
}

export const SourceBadge = ({ review }: { review: Review }) => {
  const config = getConfig(review);
  if (!config) return null;

  const className = `inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${config.className}`;

  if (review.sourceUrl) {
    return (
      <a
        href={review.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View review on ${config.label}`}
        className={`${className} transition-all group-hover/link:brightness-125 group-active/link:brightness-125 group-hover/link:scale-105 group-active/link:scale-105`}
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
