"use client";

import { useTranslations } from "next-intl";
import { LocalizedText } from "./shared";

export function FullDisclaimerLink() {
  const t = useTranslations("controls");
  return (
    <a
      href="#full-disclaimer"
      className="mt-4 inline-block underline underline-offset-4"
      onClick={() => {
        const details = document.getElementById("full-disclaimer");
        if (details instanceof HTMLDetailsElement) details.open = true;
      }}
    >
      <LocalizedText>{t("fullDisclaimer")}</LocalizedText>
    </a>
  );
}
