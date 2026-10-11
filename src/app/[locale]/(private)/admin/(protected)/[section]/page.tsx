import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { DeferredAdminSection, type Locale } from "@/components/accounts";
import { privatePageMetadata } from "@/components/accounts/private-page-metadata";
import { requirePageRole } from "@/lib/auth/guards";
import { localePath } from "@/lib/auth/paths";

const sections = {
  methodologies: "Methodologies",
  securities: "Securities and data",
  ingestion: "Ingestion",
  editions: "Editions",
  analysts: "Analysts",
} as const;
type Section = keyof typeof sections;
type PageProps = { params: Promise<{ locale: string; section: string }> };
function isSection(value: string): value is Section {
  return Object.prototype.hasOwnProperty.call(sections, value);
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, section } = await params;
  return privatePageMetadata(locale, isSection(section) ? sections[section] : "Admin section");
}

export default async function DeferredSectionPage({ params }: PageProps) {
  const { locale: routeLocale, section } = await params;
  if (!isSection(section)) notFound();
  const slug = section;
  const locale: Locale = routeLocale === "en" ? "en" : "ar";
  const t = await getTranslations({ locale });
  await requirePageRole(locale, localePath(locale, `/admin/${slug}`), ["admin", "editor"]);
  return (
    <section aria-label={t("nav.admin")}>
      <DeferredAdminSection locale={locale} title={sections[slug]} />
    </section>
  );
}
