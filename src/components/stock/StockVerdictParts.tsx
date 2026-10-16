import type { ReactNode } from "react";
import { LocalizedText } from "../foundation/shared";
import { Num } from "../foundation/Num";
import { reviewText, type Locale } from "../accounts/types";
import { formatCalendarDate, formatNumber } from "@/lib/format";
import { renderArabicDraft } from "@/engine/reasons/ar";
import { renderEnglish } from "@/engine/reasons/en";
import type { StatusReason } from "@/engine/types";
import type { PublicStockData, StockCriterion, StockSource } from "@/stock/types";
import styles from "./StockVerdict.module.css";

const stockReviewPhrases = [
  "English only", "Arabic only", "Not recorded", "No specific status reasons were recorded.",
  "Stored criterion labels are English only", "No reason template available.",
  "No criteria were recorded for this run.", "Criterion", "Ratio", "Threshold", "Numerator",
  "Denominator", "Input state", "Confidence tier", "Calculation", "Result", "Borderline margin",
  "Show calculation", "Unlabelled criterion", "No calculation trace was stored.",
  "EXPLANATION OBJECT", "AI explanation", "Arabic narrative is not available; structured evidence only.",
  "AI text discarded — showing structured evidence only",
  "No validated narrative text is stored; structured evidence only.",
  "The generated text did not pass validation against the engine's evidence, so it was discarded. Every figure below comes straight from the engine.",
  "Every figure in this text was checked against the engine's evidence.", "Structured evidence",
  "PUBLIC SCREENING RECORD", "SEC label", "Coverage by", "Analyst profile unavailable",
  "No safe profile image URL is available; no image has been manufactured.", "SCREENING RESULT",
  "Screening", "Under", "Data as of", "Period end", "Filing date", "Confidence", "Data adequacy",
  "Data date", "Why?", "No screening run recorded for this methodology yet.",
  "No result is shown because no stored run is available.", "DETERMINISTIC RECORD",
  "Why this assessment", "STORED RUN EVIDENCE", "What we know", "Result", "Numerator",
  "Denominator", "Ratio", "No criterion evidence was stored for this run.", "RECORDED GAPS",
  "What we don't know", "Why missing", "Effect", "Severity",
  "No unknown inputs were recorded for this run.", "DOCUMENTED RULE SET", "Methodology",
  "Open methodology and this version", "CRITERION RECORD", "Criteria", "CURRENT PERIOD FACTS",
  "Fundamentals", "Label", "Value", "Unit", "Period", "Source",
  "No current-period facts were recorded.", "PROVENANCE", "Sources", "Type", "Accession / reference",
  "Filed date", "Open source", "No sources were stored for this page.", "APPEND-ONLY RUNS",
  "Change history / prior runs", "Current", "Unchanged", "No earlier run for this methodology.",
  "IMMUTABLE RUN RECORD", "Run metadata", "Run hash", "Generated", "Calculation version",
  "Engine version", "Screening runs are append-only. This record is never edited.",
  "IMPORTANT CONTEXT", "Source reference", "Methodology unavailable", "Unavailable",
  "Unavailable in the stored source record",
] as const;
type StockReviewPhrase = (typeof stockReviewPhrases)[number];
const reviewedStockCopy = Object.fromEntries(stockReviewPhrases.map((phrase) => [
  phrase,
  (locale: Locale) => reviewText(locale, phrase),
])) as Record<StockReviewPhrase, (locale: Locale) => string>;

export function Copy({ locale, children }: { locale: Locale; children: string }) {
  const reviewed = reviewedStockCopy[children as StockReviewPhrase];
  return <LocalizedText>{reviewed ? reviewed(locale) : reviewText(locale, children)}</LocalizedText>;
}

export function Bilingual({
  locale,
  arabic,
  english,
}: {
  locale: Locale;
  arabic: string | null | undefined;
  english: string | null | undefined;
}) {
  const primary = locale === "ar" ? arabic : english;
  const fallback = locale === "ar" ? english : arabic;
  if (typeof primary === "string" && primary.trim()) return <>{primary.trim()}</>;
  if (typeof fallback === "string" && fallback.trim()) {
    return (
      <>
        <span lang={locale === "ar" ? "en" : "ar"} dir={locale === "ar" ? "ltr" : "rtl"}>{fallback.trim()}</span>{" "}
        <span className={styles.languageMarker}><Copy locale={locale}>{locale === "ar" ? "English only" : "Arabic only"}</Copy></span>
      </>
    );
  }
  return <span className={styles.missing}><Copy locale={locale}>Not recorded</Copy></span>;
}

export function Field({ label, children }: { label: ReactNode; children: ReactNode }) {
  return <div className={styles.field}><dt>{label}</dt><dd>{children}</dd></div>;
}

export function safeUrl(value: string | null | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function sourceNumbers(sources: StockSource[]) {
  return new Map<string, number>(sources.map((source, index) => [source.id, index + 1] as const));
}

export function SourceRefs({
  ids,
  numbers,
  locale,
}: {
  ids: string[];
  numbers: Map<string, number>;
  locale: Locale;
}) {
  const refs = ids.map((id) => numbers.get(id)).filter((number): number is number => number !== undefined);
  if (!refs.length) return null;
  return (
    <span className={styles.sourceRefs} aria-label={reviewText(locale, "Sources")}>
      {refs.map((number) => (
        <a key={number} href={`#source-${number}`} aria-label={reviewText(locale, "Source reference")}>
          [<Num>{number}</Num>]
        </a>
      ))}
    </span>
  );
}

function amount(value: number | null, locale: Locale) {
  if (value === null || !Number.isFinite(value)) return "—";
  return formatNumber(value, locale, { maximumFractionDigits: 6 });
}

export function CriterionValue({ value, locale }: { value: number | null; locale: Locale }) {
  return value === null ? <>—</> : <Num>{amount(value, locale)}</Num>;
}

function ThresholdValue({ criterion, value, locale }: { criterion: StockCriterion; value: number | null; locale: Locale }) {
  if (value === null) return <>—</>;
  const isPercent = criterion.threshold_unit?.startsWith("percent_");
  return <Num>{formatNumber(value, locale, { maximumFractionDigits: 4 })}{isPercent ? "%" : ""}</Num>;
}

export function RatioValue({ criterion, value, locale }: { criterion: StockCriterion; value: number | null; locale: Locale }) {
  if (value === null) return <>—</>;
  const isPercent = criterion.threshold_unit?.startsWith("percent_");
  return <Num>{formatNumber(value, locale, { maximumFractionDigits: 2 })}{isPercent ? "%" : ""}</Num>;
}

const reasonKinds = new Set(["failure", "borderline", "criterion_unknown", "blocking_unknown", "review_unknown", "counts"]);
const reasonCodes = new Set([
  "boolean_positive", "boolean_nonpositive", "within_margin", "max_within_limit", "max_exceeded",
  "min_met", "min_not_met", "denominator_unavailable", "denominator_nonpositive", "numerator_unavailable",
  "no_segments", "shares_unavailable", "unclassified_primary", "primary_tied", "primary_prohibited",
  "primary_permissible", "evaluator_unregistered", "stale_data", "criterion_counts",
]);
const thresholdUnits = new Set(["percent_of_total_revenue", "percent_of_total_assets", "percent_of_market_cap", "boolean", "absolute"]);

function storedReasonToEngine(value: unknown): StatusReason | null {
  if (!value || typeof value !== "object") return null;
  const stored = value as Record<string, unknown>;
  const get = (camel: string, snake: string) => stored[camel] ?? stored[snake];
  const kind = stored.kind;
  const reasonCode = get("reasonCode", "reason_code");
  const thresholdUnit = get("thresholdUnit", "threshold_unit") ?? null;
  const ratio = stored.ratio ?? null;
  const threshold = stored.threshold ?? null;
  const label = stored.label ?? stored.criterion_label ?? "";
  const criterionId = get("criterionId", "criterion_id") ?? null;
  const field = stored.field ?? null;
  if (typeof kind !== "string" || !reasonKinds.has(kind) || typeof reasonCode !== "string" || !reasonCodes.has(reasonCode)) return null;
  if (thresholdUnit !== null && (typeof thresholdUnit !== "string" || !thresholdUnits.has(thresholdUnit))) return null;
  if ((ratio !== null && (typeof ratio !== "number" || !Number.isFinite(ratio))) ||
      (threshold !== null && (typeof threshold !== "number" || !Number.isFinite(threshold)))) return null;
  if ((criterionId !== null && typeof criterionId !== "string") || typeof label !== "string" ||
      (field !== null && typeof field !== "string")) return null;
  const borderlineCount = get("borderlineCount", "borderline_count");
  const unknownCount = get("unknownCount", "unknown_count");
  return {
    kind: kind as StatusReason["kind"],
    criterionId: criterionId as string | null,
    label,
    ratio: ratio as number | null,
    threshold: threshold as number | null,
    thresholdUnit: thresholdUnit as StatusReason["thresholdUnit"],
    reasonCode: reasonCode as StatusReason["reasonCode"],
    field: field as string | null,
    ...(typeof borderlineCount === "number" ? { borderlineCount } : {}),
    ...(typeof unknownCount === "number" ? { unknownCount } : {}),
  };
}

export function ReasonList({ reasons, locale }: { reasons: unknown[]; locale: Locale }) {
  if (!reasons.length) return <p className={styles.muted}><Copy locale={locale}>No specific status reasons were recorded.</Copy></p>;
  const render = locale === "ar" ? renderArabicDraft : renderEnglish;
  return (
    <ul className={styles.reasonList}>
      {reasons.map((stored, index) => {
        const reason = storedReasonToEngine(stored);
        return <li key={`${reason?.kind ?? "unknown"}-${reason?.criterionId ?? reason?.field ?? index}`} lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
          {locale === "ar" && <span className={styles.languageMarker}><Copy locale={locale}>Stored criterion labels are English only</Copy> · </span>}
          {reason ? render(reason) : <Copy locale={locale}>No reason template available.</Copy>}
        </li>;
      })}
    </ul>
  );
}

function StructuredValue({ value, locale }: { value: unknown; locale: Locale }) {
  if (value === null || value === undefined || typeof value === "boolean" || typeof value === "string") {
    return <span>{value === null || value === undefined ? "—" : String(value)}</span>;
  }
  if (typeof value === "number") return <Num>{formatNumber(value, locale, { maximumFractionDigits: 6 })}</Num>;
  if (Array.isArray(value)) {
    return value.length ? <ul className={styles.nestedList}>{value.map((item, i) => <li key={i}><StructuredValue value={item} locale={locale} /></li>)}</ul> : <>—</>;
  }
  const entries = Object.entries(value as Record<string, unknown>);
  if (!entries.length) return <>—</>;
  return <dl className={styles.structured}>{entries.map(([key, item]) => <div key={key}><dt dir="ltr">{key}</dt><dd><StructuredValue value={item} locale={locale} /></dd></div>)}</dl>;
}

export function sourceFiledDate(source: StockSource, data: PublicStockData, locale: Locale) {
  return data.period?.source_id === source.id && data.period.reported_date
    ? formatCalendarDate(data.period.reported_date, locale)
    : reviewText(locale, "Unavailable in the stored source record");
}

export function periodFiledDate(data: PublicStockData, locale: Locale) {
  return data.period?.source_id && data.period.reported_date
    ? formatCalendarDate(data.period.reported_date, locale)
    : reviewText(locale, "Unavailable");
}

export function CriteriaTable({ criteria, sources, locale }: { criteria: StockCriterion[]; sources: Map<string, number>; locale: Locale }) {
  const headers = ["Criterion", "Ratio", "Threshold", "Numerator", "Denominator", "Input state", "Confidence tier", "Calculation", "Result", "Borderline margin"];
  const label = (criterion: StockCriterion) => criterion.criterion_label || reviewText(locale, "Unlabelled criterion");
  if (!criteria.length) return <p className={styles.muted}><Copy locale={locale}>No criteria were recorded for this run.</Copy></p>;
  return (
    <div className={styles.criteriaWrap}>
      <table className={styles.criteriaTable}>
        <thead><tr>{headers.map((header) => <th key={header} scope="col"><Copy locale={locale}>{header}</Copy></th>)}</tr></thead>
        <tbody>
          {criteria.map((criterion) => {
            const cells = [
              <Bilingual key="criterion" locale={locale} arabic={null} english={label(criterion)} />,
              <RatioValue key="ratio" criterion={criterion} value={criterion.ratio} locale={locale} />,
              <ThresholdValue key="threshold" criterion={criterion} value={criterion.threshold} locale={locale} />,
              <span key="numerator"><Bilingual locale={locale} arabic={null} english={criterion.numerator_definition || "—"} />: <CriterionValue value={criterion.numerator_value} locale={locale} /></span>,
              <span key="denominator"><Bilingual locale={locale} arabic={null} english={criterion.denominator_definition || "—"} />: <CriterionValue value={criterion.denominator_value} locale={locale} /></span>,
              <span key="state"><Bilingual locale={locale} arabic={null} english={criterion.input_states.length ? criterion.input_states.join(", ") : "—"} /></span>,
              <span key="tier"><Bilingual locale={locale} arabic={null} english={criterion.confidence_tier ?? "—"} /></span>,
              <details key="calc" className={styles.calculation}><summary><Copy locale={locale}>Show calculation</Copy></summary><p><Bilingual locale={locale} arabic={null} english={criterion.calculation_trace || reviewText(locale, "No calculation trace was stored.")} /></p></details>,
              <span key="result" className={styles.result}><Bilingual locale={locale} arabic={null} english={criterion.result} /></span>,
              <ThresholdValue key="margin" criterion={criterion} value={criterion.borderline_margin} locale={locale} />,
            ];
            return <tr key={criterion.id}>{cells.map((cell, i) => <td key={headers[i]} data-label={reviewText(locale, headers[i])}>{cell}</td>)}</tr>;
          })}
        </tbody>
      </table>
      <div className={styles.criteriaCards}>
        {criteria.map((criterion) => (
          <article className={styles.criterionCard} key={criterion.id}>
            <h3><Bilingual locale={locale} arabic={null} english={label(criterion)} /> <span className={styles.result}><Bilingual locale={locale} arabic={null} english={criterion.result} /></span></h3>
            <dl className={styles.cardFields}>
              {headers.filter((head) => !["Criterion", "Calculation"].includes(head)).map((head) => {
                const values: Record<string, ReactNode> = {
                  Ratio: <RatioValue criterion={criterion} value={criterion.ratio} locale={locale} />,
                  Threshold: <ThresholdValue criterion={criterion} value={criterion.threshold} locale={locale} />,
                  Numerator: <><Bilingual locale={locale} arabic={null} english={criterion.numerator_definition || "—"} /> · <CriterionValue value={criterion.numerator_value} locale={locale} /></>,
                  Denominator: <><Bilingual locale={locale} arabic={null} english={criterion.denominator_definition || "—"} /> · <CriterionValue value={criterion.denominator_value} locale={locale} /></>,
                  "Input state": <Bilingual locale={locale} arabic={null} english={criterion.input_states.join(", ") || "—"} />,
                  "Confidence tier": <Bilingual locale={locale} arabic={null} english={criterion.confidence_tier ?? "—"} />,
                  Result: <Bilingual locale={locale} arabic={null} english={criterion.result} />,
                  "Borderline margin": <ThresholdValue criterion={criterion} value={criterion.borderline_margin} locale={locale} />,
                };
                return <Field key={head} label={<Copy locale={locale}>{head}</Copy>}>{values[head]}</Field>;
              })}
            </dl>
            <details className={styles.calculation}><summary><Copy locale={locale}>Show calculation</Copy></summary><p><Bilingual locale={locale} arabic={null} english={criterion.calculation_trace || reviewText(locale, "No calculation trace was stored.")} /></p></details>
            <SourceRefs ids={criterion.source_ids} numbers={sources} locale={locale} />
          </article>
        ))}
      </div>
    </div>
  );
}

export function ExplanationSlot({ explanation, locale }: { explanation: NonNullable<PublicStockData["explanation"]>; locale: Locale }) {
  const validEnglish = locale === "en" && explanation.validation_status === "passed" && Boolean(explanation.ai_text);
  return (
    <section className={styles.section} data-section="explanation" aria-labelledby="stock-explanation-title">
      <div className={styles.sectionHeading}><p className={styles.eyebrow}><Copy locale={locale}>EXPLANATION OBJECT</Copy></p><h2 id="stock-explanation-title"><Copy locale={locale}>AI explanation</Copy></h2></div>
      {!validEnglish ? (
        <div className={styles.structuredNotice}>
          <h3><Copy locale={locale}>{locale === "ar" ? "Arabic narrative is not available; structured evidence only." : explanation.validation_status === "failed" ? "AI text discarded — showing structured evidence only" : "No validated narrative text is stored; structured evidence only."}</Copy></h3>
          {locale === "en" && explanation.validation_status === "failed" && <p><Copy locale={locale}>The generated text did not pass validation against the engine&apos;s evidence, so it was discarded. Every figure below comes straight from the engine.</Copy></p>}
        </div>
      ) : (
        <div className={styles.aiText}><p className={styles.validationNote}><Copy locale={locale}>Every figure in this text was checked against the engine&apos;s evidence.</Copy></p>{explanation.ai_text}</div>
      )}
      {((explanation.evidence ?? []).length > 0 || (explanation.unknowns ?? []).length > 0) && (
        <div className={styles.explanationStructured}>
          <h3><Copy locale={locale}>Structured evidence</Copy></h3>
          {(explanation.evidence ?? []).map((entry, index) => <div className={styles.structuredEntry} key={`evidence-${index}`}><StructuredValue value={entry} locale={locale} /></div>)}
          {(explanation.unknowns ?? []).map((entry, index) => <div className={styles.structuredEntry} key={`unknown-${index}`}><StructuredValue value={entry} locale={locale} /></div>)}
        </div>
      )}
    </section>
  );
}
