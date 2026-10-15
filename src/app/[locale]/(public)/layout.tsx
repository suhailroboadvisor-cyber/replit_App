import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "../../../i18n/navigation";
import {
  Disclaimer,
  LocalizedText,
  LocaleSwitcher,
  Lockup,
  ThemeToggle,
} from "../../../components/foundation";
import { FullDisclaimerLink } from "../../../components/foundation/FullDisclaimerLink";
import { LocaleDocument, documentMetadata } from "../../../components/foundation/LocaleDocument";
import { AccountControl } from "../../../components/accounts/AccountControl";
export const metadata = documentMetadata;
export const revalidate = 900;
export const dynamic = "force-static";
export function generateStaticParams() {
  // D-102: no database access or public-page rendering during CI/image builds.
  // Each locale/page is generated and cached on its first runtime request.
  return [];
}

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  return (
    <LocaleDocument locale={locale}>
      <a
        href="#content"
        className="fixed start-4 top-2 z-50 -translate-y-24 bg-card px-4 py-2 text-card-foreground focus:translate-y-0"
      >
        <LocalizedText>{t("controls.skip")}</LocalizedText>
      </a>
      <header className="surface-dark border-b border-[var(--divider)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-5">
          <Link href="/" aria-label={t("app.name")}>
            <Lockup surface="dark" />
          </Link>
          <div className="flex flex-wrap items-center gap-6">
            <nav aria-label={t("nav.menu")} className="flex gap-6 text-sm">
              <Link href="/" className="hover:underline">
                {t("nav.picks")}
              </Link>
              <Link href="/methodology" className="hover:underline">
                {t("nav.methodologies")}
              </Link>
            </nav>
              <AccountControl locale={locale === "en" ? "en" : "ar"} />
            <div className="flex items-center gap-3 border-s border-[var(--divider)] ps-5">
              <LocaleSwitcher className="text-sm hover:underline" />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      {children}
      <footer className="mx-auto max-w-6xl border-t border-[var(--divider)] px-6 py-8 text-sm text-muted-foreground">
        <Disclaimer />
        <details id="full-disclaimer" className="mt-4">
          <summary className="w-fit cursor-pointer text-foreground underline underline-offset-4">
            <LocalizedText>{t("controls.fullDisclaimer")}</LocalizedText>
          </summary>
          <div className="mt-4 max-w-prose">
            <Disclaimer variant="full" />
          </div>
        </details>
        <FullDisclaimerLink />
      </footer>
    </LocaleDocument>
  );
}
