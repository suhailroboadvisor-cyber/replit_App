import { ArrowLeft, ArrowRight } from "lucide-react";
import { localePath, safeNext } from "@/lib/auth/paths";
import { reviewText, type Locale } from "./types";

export function BackLink({ locale, next, label = "Back" }: {
  locale: Locale; next?: string | null; label?: string;
}) {
  const Arrow = locale === "ar" ? ArrowRight : ArrowLeft;
  return <a href={safeNext(next) ?? localePath(locale, "/")}
    className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">
    <Arrow aria-hidden="true" size={17} strokeWidth={1.6} data-back-direction={locale === "ar" ? "right" : "left"} />
    {reviewText(locale, label)}
  </a>;
}
