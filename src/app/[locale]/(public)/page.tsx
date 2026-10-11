import { getTranslations, setRequestLocale } from "next-intl/server";
import { EmptyState } from "../../../components/foundation";

export const revalidate = 900;
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  return (
    <main id="content" className="mx-auto min-h-[45vh] max-w-6xl px-6 py-14">
      <h1 className="text-3xl">{t("app.tagline")}</h1>
      <div className="mt-10 border-t border-[var(--divider)]">
        <EmptyState />
      </div>
    </main>
  );
}
