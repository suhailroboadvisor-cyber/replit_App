"use client";

import { useSyncExternalStore } from "react";
import { RecoveryScreen } from "./RecoveryScreen";

const subscribe = () => () => {};
const getLocale = () => /^\/en(?:\/|$)/.test(window.location.pathname) ? "en" : "ar";
const serverLocale = () => "ar" as const;

// Multiple root layouts can fail before any intl provider is mounted. No request
// reads: keep both locale homes available even before hydration or without JS.
export function RecoveryDocument({ kind }: { kind: "error" | "not-found" }) {
  const locale = useSyncExternalStore(subscribe, getLocale, serverLocale);
  return <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="dark">
    <body>
      <RecoveryScreen locale={locale} kind={kind} />
      <nav aria-label="Suhail" className="mx-auto flex max-w-2xl flex-wrap gap-6 px-6 pb-10">
        {/* Full document navigation recovers a failed root layout and restores D-22 theme. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" lang="ar" dir="rtl" className="min-h-11 underline">سهيل</a>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/en" lang="en" dir="ltr" className="min-h-11 underline">Suhail — English</a>
      </nav>
    </body>
  </html>;
}
