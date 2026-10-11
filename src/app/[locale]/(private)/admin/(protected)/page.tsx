import { getTranslations } from "next-intl/server";
import { DeferredAdminSection, type Locale } from "@/components/accounts";
import { privatePageMetadata } from "@/components/accounts/private-page-metadata";
import { requirePageRole } from "@/lib/auth/guards";
import { localePath } from "@/lib/auth/paths";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return privatePageMetadata(locale, "Methodologies");
}

export default async function AdminHomePage({ params }: PageProps) {
  const { locale: routeLocale } = await params;
  const locale: Locale = routeLocale === "en" ? "en" : "ar";
  const t = await getTranslations({ locale });
  await requirePageRole(locale, localePath(locale, "/admin"), ["admin", "editor"]);
  return (
    <section aria-label={t("nav.admin")}>
      <DeferredAdminSection locale={locale} title="Methodologies" />
    </section>
  );
}
