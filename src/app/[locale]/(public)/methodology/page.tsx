import { getTranslations, setRequestLocale } from "next-intl/server";
import { LocalizedText } from "../../../../components/foundation";

// Keep the existing public navigation usable while the methodology directory
// is not implemented. This is not an empty database result or a screening rule.
export const revalidate = 900;

export default async function Methodology({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <main id="content" className="mx-auto min-h-[45vh] max-w-6xl px-6 py-14">
      <h1 className="text-3xl">
        <LocalizedText>{t("nav.methodologies")}</LocalizedText>
      </h1>
      <p className="mt-10 border-t border-[var(--divider)] pt-10 text-muted-foreground">
        <LocalizedText>{t("controls.sectionUnavailable")}</LocalizedText>
      </p>
    </main>
  );
}
