"use client";

import { useLocale } from "next-intl";
import { localePath } from "@/lib/auth/paths";
import { reviewText, type Locale } from "@/components/accounts/types";

export function RecoveryScreen({ locale, kind, retry }: {
  locale: Locale; kind: "error" | "not-found"; retry?: () => void;
}) {
  return <main dir={locale === "ar" ? "rtl" : "ltr"} className="mx-auto min-h-[50vh] max-w-2xl px-6 py-16">
    <h1 className="text-3xl">{kind === "not-found" ? "404" : reviewText(locale, "This page could not be loaded.")}</h1>
    <div className="mt-6 flex flex-wrap gap-6">
      <a href={localePath(locale, "/")} className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">{reviewText(locale, "Back to Suhail")}</a>
      {retry && <button onClick={retry} className="min-h-11 underline underline-offset-4">{reviewText(locale, "Retry")}</button>}
    </div>
  </main>;
}

export function LocalizedRecovery({ kind, retry }: { kind: "error" | "not-found"; retry?: () => void }) {
  const locale = useLocale() === "en" ? "en" : "ar";
  return <RecoveryScreen locale={locale} kind={kind} retry={retry} />;
}
