"use client";

import { useLocale } from "next-intl";
import enMessages from "@/i18n/messages/en.json";
import { LocalizedText } from "@/components/foundation";

const copy = enMessages.governed;
export type GovernedKey = keyof typeof copy;

export function governedText(locale: string, id: GovernedKey) {
  const english = copy[id];
  return locale === "ar" ? `⟦AR-REVIEW⟧ ${english}` : english;
}

export function GovernedCopy({ id }: { id: GovernedKey }) {
  const locale = useLocale();
  return <LocalizedText>{governedText(locale, id)}</LocalizedText>;
}
