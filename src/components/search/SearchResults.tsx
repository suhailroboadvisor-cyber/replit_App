import { useTranslations } from "next-intl";
import { EmptyState, StatusBadge, LocalizedText } from "../foundation";
import { Bilingual } from "../stock/StockVerdictParts";
import type { SearchResult } from "../../db/search-public";

export function SearchResults({ results, locale, valid }: {
  results: SearchResult[]; locale: "ar" | "en"; valid: boolean;
}) {
  const t = useTranslations("publicSearch");
  if (!results.length) return (
    <EmptyState title={t(valid ? "noResults" : "title")}>
      <LocalizedText>{t(valid ? "noResultsBody" : "hint")}</LocalizedText>
    </EmptyState>
  );
  return (
    <ul className="mt-8 divide-y divide-[var(--divider)]">
      {results.map(result => (
        <li key={result.slug} className="flex flex-wrap items-center justify-between gap-4 py-5">
          <a href={`${locale === "en" ? "/en" : ""}/stock/${result.slug}`} className="underline underline-offset-4">
            <bdi className="font-mono tabular-nums">{result.ticker}</bdi>{" · "}
            <Bilingual locale={locale} arabic={result.name_ar} english={result.name} />
          </a>
          <bdi className="font-mono text-sm">{result.exchange ?? "—"}</bdi>
          {result.status ? <StatusBadge status={result.status} /> : <LocalizedText>{t("notScreened")}</LocalizedText>}
        </li>
      ))}
    </ul>
  );
}
