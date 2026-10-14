import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPublicMethodologies } from "../../../../db/methodology-public";
import { MethodologyDirectory } from "../../../../components/methodology/MethodologyDirectory";
import { MethodologyCopy } from "../../../../components/methodology/MethodologyCopy";
import { LocalizedText } from "../../../../components/foundation";

// D-20: public methodology documentation is time-revalidated and remains
// independent of request cookies and headers.
export const revalidate = 900;

export default async function Methodology({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  let groups: Awaited<ReturnType<typeof getPublicMethodologies>> = [];
  let failed = false;
  try {
    groups = await getPublicMethodologies();
  } catch {
    failed = true;
  }
  if (failed) {
    return (
      <main id="content" className="mx-auto min-h-[55vh] max-w-6xl px-5 py-14 sm:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--byline)]">
          <MethodologyCopy id="publicResearchDocumentation" />
        </p>
        <h1 className="mt-4 text-4xl"><LocalizedText>{t("methodologies.title")}</LocalizedText></h1>
        <section role="alert" className="mt-10 border-s-2 border-[var(--brass)] bg-card px-5 py-6">
          <h2 className="text-lg"><MethodologyCopy id="registerUnavailable" /></h2>
          <p className="mt-2 text-sm text-muted-foreground">
            <MethodologyCopy id="tryAgainSoon" />
          </p>
          <form method="get" className="mt-5">
            <button type="submit" className="inline-flex min-h-11 items-center border border-[var(--divider)] px-4 text-sm hover:border-[var(--brass)]">
            <MethodologyCopy id="retry" />
            </button>
          </form>
        </section>
      </main>
    );
  }
  return <MethodologyDirectory groups={groups} locale={locale} />;
}
