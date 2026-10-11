import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import { THEME_SCRIPT } from "../../lib/theme-script";
import "../../app/globals.css";
const arabic = IBM_Plex_Sans_Arabic({subsets:["arabic"],weight:["300","400","500","600","700"],variable:"--font-arabic",display:"swap"});
const latin = IBM_Plex_Sans({subsets:["latin"],weight:["300","400","500","600","700"],variable:"--font-latin",display:"swap"});
const mono = IBM_Plex_Mono({subsets:["latin"],weight:["400","500"],variable:"--font-numbers",display:"swap"});
export const documentMetadata: Metadata = {
  title: "سهيل · Suhail", description: "دليلك في السوق.", manifest: "/manifest.webmanifest",
  icons: {icon:[{url:"/icons/favicon.ico",sizes:"16x16 32x32"}],apple:[{url:"/icons/icon-180.png",sizes:"180x180",type:"image/png"}]},
};
// D-22/D-51: reusable document never reads headers/cookies. Only private caller supplies nonce.
export async function LocaleDocument({children,locale,nonce}: {children: React.ReactNode;locale:string;nonce?:string}) {
  if (!hasLocale(routing.locales,locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages({locale});
  return <html lang={locale} dir={locale==="ar"?"rtl":"ltr"} className={`dark ${arabic.variable} ${latin.variable} ${mono.variable}`} suppressHydrationWarning>
    {/* App Router root document owns this head; next/head is for the Pages Router. */}
    {/* eslint-disable-next-line @next/next/no-head-element */}
    <head><script nonce={nonce} dangerouslySetInnerHTML={{__html:THEME_SCRIPT}} /></head>
    <body><NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">{children}</NextIntlClientProvider></body>
  </html>;
}
