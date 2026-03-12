import type { Locale } from "./ui";
import { ui } from "./ui";

export function useTranslations(lang: Locale) {
  return function t(key: string): string {
    return ui[lang][key] ?? ui["en"][key] ?? key;
  };
}
