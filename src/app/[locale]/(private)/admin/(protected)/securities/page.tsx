import { getTranslations } from "next-intl/server";
import { FinancialAdmin } from "@/components/financial/FinancialAdmin";
import { privatePageMetadata } from "@/components/accounts/private-page-metadata";
import type { Locale } from "@/components/accounts/types";
import { requireRole } from "@/lib/auth/guards";
import { getFinancialAdminData } from "@/lib/financial/data";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return privatePageMetadata(locale, "Securities and data");
}

export default async function SecuritiesAdminPage({ params }: PageProps) {
  const { locale: routeLocale } = await params;
  const locale: Locale = routeLocale === "en" ? "en" : "ar";
  const context = await requireRole(["admin", "editor"]);
  const t = await getTranslations({ locale });
  const data = await getFinancialAdminData();
  return <section aria-label={t("nav.admin")}>
    <FinancialAdmin data={data} role={context.user.role as "admin" | "editor"} view="securities" />
  </section>;
}
