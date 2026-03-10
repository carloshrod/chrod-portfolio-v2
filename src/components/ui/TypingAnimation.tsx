import { useEffect, useState } from "react";

const SUFFIX = " Developer";
const prefixes = [
  "Frontend",
  "Backend",
  "Full-Stack",
  "React & Next.js",
  "Automation",
];

const TYPING_SPEED = 80;
const DELETING_SPEED = 45;
const PAUSE_AFTER_TYPE = 1600;
const PAUSE_AFTER_DELETE = 400;

export default function TypingAnimation() {
  const [displayedPrefix, setDisplayedPrefix] = useState("");
  const [suffixShown, setSuffixShown] = useState(false);
  const [prefixIndex, setPrefixIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPrefix = prefixes[prefixIndex];

    // Phase 1: type the full first role ("Frontend Developer") char by char
    if (!suffixShown) {
      const fullFirstRole = currentPrefix + SUFFIX;

      if (displayedPrefix === fullFirstRole) {
        const t = setTimeout(() => {
          setSuffixShown(true);
          setDisplayedPrefix(currentPrefix);
          setIsDeleting(true);
        }, PAUSE_AFTER_TYPE);
        return () => clearTimeout(t);
      }

      const t = setTimeout(() => {
        setDisplayedPrefix(fullFirstRole.slice(0, displayedPrefix.length + 1));
      }, TYPING_SPEED);
      return () => clearTimeout(t);
    }

    // Phase 2+: " Developer" stays static, only the prefix animates
    if (!isDeleting && displayedPrefix === currentPrefix) {
      const t = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
      return () => clearTimeout(t);
    }

    if (isDeleting && displayedPrefix === "") {
      const t = setTimeout(() => {
        setIsDeleting(false);
        setPrefixIndex((i) => (i + 1) % prefixes.length);
      }, PAUSE_AFTER_DELETE);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () => {
        setDisplayedPrefix(
          isDeleting
            ? currentPrefix.slice(0, displayedPrefix.length - 1)
            : currentPrefix.slice(0, displayedPrefix.length + 1),
        );
      },
      isDeleting ? DELETING_SPEED : TYPING_SPEED,
    );
    return () => clearTimeout(t);
  }, [displayedPrefix, suffixShown, prefixIndex, isDeleting]);

  return (
    <p className="mb-8 text-lg leading-relaxed text-slate-400">
      <span className="text-2xl text-red-400">{"> "}</span>
      <span className="font-semibold text-slate-100">
        {displayedPrefix}
        <span className="ml-0.5 inline-block w-0.5 animate-pulse bg-red-400 align-middle text-transparent">
          |
        </span>
        {suffixShown ? SUFFIX : ""}
      </span>
    </p>
  );
}
