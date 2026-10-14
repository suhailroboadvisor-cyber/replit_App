import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LocalizedText } from "../../../../../components/foundation";
import {
  getPublicMethodology,
  type PublicMethodologyPageData,
} from "../../../../../db/methodology-public";
import { MethodologyDetail } from "../../../../../components/methodology/MethodologyDetail";
import { PublicMethodologyVersions } from "../../../../../components/methodology/PublicMethodologyVersions";
import { MethodologyCopy } from "../../../../../components/methodology/MethodologyCopy";
import { Link } from "../../../../../i18n/navigation";

// D-20: documentation is ISR-cacheable; no request headers or cookies are read.
export const revalidate = 900;
// Unknown slugs are statically generated on demand; selection never reads
// searchParams on the server, which would opt this route out of classic ISR.
export const dynamic = "force-static";

export default async function MethodologyVersionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  let data: PublicMethodologyPageData | null;
  try {
    data = await getPublicMethodology(slug);
  } catch {
    return (
      <main id="content" className="mx-auto min-h-[55vh] max-w-6xl px-5 py-14 sm:px-8">
        <Link href="/methodology" className="text-sm text-[var(--brass-soft)] underline underline-offset-4">
          <LocalizedText>{t("methodologies.title")}</LocalizedText>
        </Link>
        <section role="alert" className="mt-10 border-s-2 border-[var(--brass)] bg-card px-5 py-6">
          <h1 className="text-2xl"><MethodologyCopy id="methodologyUnavailable" /></h1>
          <p className="mt-2 text-sm text-muted-foreground">
            <MethodologyCopy id="tryAgainSoon" />
          </p>
          <Link
            href={`/methodology/${slug}`}
            className="mt-5 inline-flex min-h-11 items-center border border-[var(--divider)] px-4 text-sm hover:border-[var(--brass)]"
          >
            <MethodologyCopy id="retry" />
          </Link>
        </section>
      </main>
    );
  }
  if (!data) notFound();
  return (
    <PublicMethodologyVersions
      defaultVersion={data.defaultVersion}
      versions={data.documents.map(({ version }) => ({
        value: version.version,
        label: version.version_label ?? version.version,
      }))}
    >
      {data.documents.map(({ version, criteria }) => (
        <MethodologyDetail
          key={version.version}
          methodology={data.methodology}
          version={version}
          criteria={criteria}
          locale={locale}
        />
      ))}
    </PublicMethodologyVersions>
  );
}
