"use client";

import { cloneElement, isValidElement, useId, useMemo, useState, useTransition, type FormEvent, type ReactElement, type ReactNode } from "react";
import { useLocale } from "next-intl";
import { AlertTriangle, ArrowUpRight, FileCheck2, LockKeyhole, Plus, RefreshCw, Search, ShieldCheck, Trash2 } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { formatDate, formatNumber } from "@/lib/format";
import { reviewText, type Locale } from "@/components/accounts/types";
import type { FinancialAdminData, FinancialCommand, FinancialResult, SecurityLookup } from "@/lib/financial/contracts";
import { financialAction } from "@/app/[locale]/(private)/admin/(protected)/financial-actions";

type Props = { data: FinancialAdminData; role: "admin" | "editor"; view: "securities" | "ingestion" };
type Tab = "facts" | "segments" | "prices" | "coverage" | "company";
const tiers = ["Verified", "Calculated", "Estimated", "AI Interpretation"] as const;
const states = ["reported", "derived", "estimated", "unknown"] as const;
const categories = ["unclassified", "conventional_finance", "interest_based_lending", "insurance_conventional", "alcohol", "tobacco", "gambling", "adult_entertainment", "pork_related", "conventional_media", "weapons_conventional", "generic_permissible", "real_estate_permissible", "technology", "healthcare", "retail_permissible", "industrials", "energy", "telecom"] as const;
// The inventory is intentionally finite: ar-review discovers the literal union
// passed to reviewText here, while all unapproved Arabic remains visibly marked.
const financialCopy = [
  "Accept SEC", "Activity category", "Add a security", "Add segment", "Arabic description", "Arabic name", "Assigned analyst",
  "Cancel", "Category basis", "Close", "Confidence tier", "Confirm and ingest", "Confirm from filing", "Confirm removal",
  "Coverage started", "Currency", "Date", "Delete", "Delete this segment?", "Description", "Edit", "Editors have read-only access.",
  "English description", "English name", "Estimated", "Filing note reference", "In universe", "Ingest now", "Input state",
  "Look up a US ticker before adding it to the curated universe.", "Mapping note", "No", "No analyst assigned",
  "No business segments are recorded for the latest period.", "No facts are recorded for this period.", "No ingestion jobs recorded.",
  "No latest period", "No manual prices are recorded.", "No securities in the curated universe.", "Note",
  "One or more segments are unclassified; classify them using filing evidence.", "Open source", "Origin", "Outside universe",
  "Override", "Preview", "Protected current", "Reason (required)", "Remove from universe",
  "Removing a security keeps its historical records and removes it from the curated universe.", "Resume", "Retained SEC alternatives",
  "Retry", "Revenue amount", "SEC changed", "Save", "Save close", "Save company fields", "Save coverage", "Save segment",
  "Security details", "Security record", "Segment name", "Select a security to inspect its records.",
  "Shares outstanding are unknown or missing. A market-cap fact cannot be derived from a close until shares are available.",
  "Source", "Source URL", "Source label", "Source notes", "Source type",
  "Start a resumable ingestion job for the curated universe, or resume a recorded run below.", "State",
  "The request failed. Reload and try again.", "This security will no longer be part of the curated universe.", "Ticker",
  "Tier", "Unknown", "Value", "Yes", "inactive", "records", "Job", "Status", "Started", "Finished", "Counts", "Actions",
  "Facts", "Segments", "Prices", "Coverage", "Company", "Ingestion", "Securities and data",
  "Job started.", "Retry queued.", "Resume requested.", "Security added and ingestion started.", "Security removed from universe.",
  "Filing confirmation saved.", "Override saved.", "SEC alternative accepted.", "Segment saved.", "Segment deleted.",
  "Manual close saved.", "Coverage assignment saved.", "Saved.", "Failed", "Completed", "Running", "Pending",
  "admin", "editor", "internal", "regulatory_filing", ...tiers, ...states, ...categories,
  "Inspect sourced financial records across the curated universe.", "Job history, progress and failed security retries.",
  "Ingestion controls", "Job history", "Security universe", "Analyst coverage", "Company profile", "Universe membership",
  "Current facts", "Business segments", "Manual price history", "CIK", "Name", "Exchange", "Sector", "Fiscal year end",
] as const;
function text(locale: Locale, value: string) {
  for (const phrase of financialCopy) if (phrase === value) return reviewText(locale, phrase);
  return reviewText(locale, value);
}
const ltr = (value: ReactNode) => <bdi dir="ltr" className="font-mono tabular-nums">{value}</bdi>;
const inputClass = "min-h-10 w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-[var(--brass)]";
const buttonClass = "inline-flex min-h-9 items-center justify-center gap-2 border border-border px-3 text-xs transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50";

function Field({ label, children }: { label: string; children: ReactNode }) {
  const id = useId();
  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<{ id?: string }>, { id })
    : children;
  return <div className="grid gap-1.5 text-xs text-muted-foreground"><label htmlFor={id}>{label}</label>{control}</div>;
}
function Panel({ locale, title, children, aside }: { locale: Locale; title: string; children: ReactNode; aside?: ReactNode }) {
  return <section className="border border-border bg-card"><header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4"><h2 className="text-base font-semibold">{text(locale, title)}</h2>{aside}</header><div className="p-5">{children}</div></section>;
}
function Empty({ children }: { children: ReactNode }) {
  return <div className="border border-dashed border-border px-5 py-8 text-center text-sm text-muted-foreground">{children}</div>;
}

export function FinancialAdmin({ data, role, view }: Props) {
  const router = useRouter();
  const locale = (useLocale() === "en" ? "en" : "ar") as Locale;
  const canEdit = role === "admin";
  const [selectedId, setSelectedId] = useState(data.securities[0]?.id ?? "");
  const [tab, setTab] = useState<Tab>("facts");
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState("");
  const [lookupTicker, setLookupTicker] = useState("");
  const [lookup, setLookup] = useState<SecurityLookup>();
  const [lookupError, setLookupError] = useState("");
  const [factEditor, setFactEditor] = useState<{ id: string; mode: "override" | "confirm" } | null>(null);
  const [segmentEditor, setSegmentEditor] = useState<string | "new" | null>(null);
  const [removing, setRemoving] = useState(false);
  const selected = data.securities.find((item) => item.id === selectedId) ?? null;
  const company = selected ? data.companies.find((item) => item.id === selected.company_id) : undefined;
  const periods = useMemo(() => data.periods.filter((item) => item.company_id === selected?.company_id), [data.periods, selected?.company_id]);
  const latestPeriod = periods.find((item) => item.is_latest);
  const facts = latestPeriod ? data.facts.filter((item) => item.company_id === selected?.company_id && item.period_id === latestPeriod.id) : [];
  const segments = latestPeriod ? data.segments.filter((item) => item.company_id === selected?.company_id && item.period_id === latestPeriod.id) : [];
  const run = (command: FinancialCommand, success: string, onSuccess?: (result: Extract<FinancialResult, { ok: true }>) => void) => {
    setFeedback("");
    startTransition(async () => {
      try {
        const result = await financialAction(command);
        if (result.ok) {
          setFeedback(text(locale, success));
          onSuccess?.(result);
          router.refresh();
        } else setFeedback(text(locale, result.error || "The request failed. Reload and try again."));
      } catch {
        setFeedback(text(locale, "The request failed. Reload and try again."));
      }
    });
  };
  const submit = (event: FormEvent<HTMLFormElement>, callback: (form: FormData) => void) => {
    event.preventDefault();
    callback(new FormData(event.currentTarget));
  };
  const companyUpdate = (form: FormData) => {
    if (!selected) return;
    run({ operation: "company", securityId: selected.id, data: {
      name_ar: String(form.get("name_ar") ?? ""), description_ar: String(form.get("description_ar") ?? ""), description_en: String(form.get("description_en") ?? ""),
    } }, "Saved.");
  };

  if (view === "ingestion") {
    return <main className="mx-auto max-w-[1280px] space-y-6">
      <Heading locale={locale} role={role} title="Ingestion" intro="Job history, progress and failed security retries." />
      {feedback && <Status locale={locale}>{feedback}</Status>}
      <Panel locale={locale} title="Ingestion controls" aside={canEdit && <button className={buttonClass} type="button" disabled={pending} onClick={() => run({ operation: "runJob" }, "Job started.")}><RefreshCw size={14} aria-hidden="true" />{text(locale, "Ingest now")}</button>}>
        {!canEdit && <p className="mb-4 text-xs text-muted-foreground">{text(locale, "Editors have read-only access.")}</p>}
        <p className="text-sm leading-6 text-muted-foreground">{text(locale, "Start a resumable ingestion job for the curated universe, or resume a recorded run below.")}</p>
      </Panel>
      <Panel locale={locale} title="Job history">
        {data.jobs.length === 0 ? <Empty>{text(locale, "No ingestion jobs recorded.")}</Empty> : <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-start text-sm"><thead><tr className="border-b border-border text-xs text-muted-foreground">{["Job", "Status", "Started", "Finished", "Counts", "Actions"].map((label) => <th key={label} className="px-3 py-3 text-start font-medium">{text(locale, label)}</th>)}</tr></thead><tbody>{data.jobs.map((job) => {
          const errors = Array.isArray(job.errors) ? job.errors : [];
          const counts = job.counts ?? {};
          return <tr key={job.id} className="border-b border-border align-top">
            <td className="px-3 py-3"><span className="block font-medium">{job.job_name}</span><span className="font-mono text-[10px] text-muted-foreground" dir="ltr">{job.id}</span></td>
            <td className="px-3 py-3">{text(locale, job.status)}</td><td className="px-3 py-3 whitespace-nowrap">{formatDate(job.started_at, locale, { dateStyle: "medium", timeStyle: "short" })}</td>
            <td className="px-3 py-3 whitespace-nowrap">{formatDate(job.finished_at, locale, { dateStyle: "medium", timeStyle: "short" })}</td>
            <td className="px-3 py-3"><div className="flex flex-wrap gap-2">{Object.entries(counts).map(([key, count]) => <span key={key} className="border border-border px-2 py-1 text-[10px]">{key}: {formatNumber(Number(count), locale)}</span>)}</div>
              {errors.length > 0 && <ul className="mt-3 space-y-2">{errors.map((error, index) => <li key={`${job.id}-${index}`} className="border-s-2 border-[var(--brass)] ps-2 text-xs">
                <span>{String(error.message ?? error.error ?? "Ingestion failed")}</span>
                {typeof error.securityId === "string" && canEdit && <button type="button" className={`${buttonClass} ms-2`} disabled={pending} onClick={() => run({ operation: "ingest", securityId: error.securityId as string }, "Retry queued.")}>{text(locale, "Retry")}</button>}
              </li>)}</ul>}</td>
            <td className="px-3 py-3">{canEdit && <button type="button" className={buttonClass} disabled={pending} onClick={() => run({ operation: "resumeJob", data: { id: job.id } }, "Resume requested.")}><RefreshCw size={13} aria-hidden="true" />{text(locale, "Resume")}</button>}</td>
          </tr>;
        })}</tbody></table></div>}
      </Panel>
    </main>;
  }

  return <main className="mx-auto max-w-[1280px] space-y-6">
    <Heading locale={locale} role={role} title="Securities and data" intro="Inspect sourced financial records across the curated universe." />
    {feedback && <Status locale={locale}>{feedback}</Status>}
    <Panel locale={locale} title="Security universe" aside={<span className="font-mono text-xs text-muted-foreground">{formatNumber(data.securities.length, locale)} / {text(locale, "records")}</span>}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)]">
        <div>
          {data.securities.length === 0 ? <Empty>{text(locale, "No securities in the curated universe.")}</Empty> : <div className="max-h-[26rem] overflow-y-auto border border-border">
            {data.securities.map((security) => {
              const firm = data.companies.find((item) => item.id === security.company_id);
              const period = data.periods.find((item) => item.company_id === security.company_id && item.is_latest);
              const rowFacts = data.facts.filter((fact) => fact.company_id === security.company_id && fact.period_id === period?.id && fact.is_current);
              const unknowns = rowFacts.filter((fact) => fact.input_state === "unknown").length;
              const estimated = rowFacts.filter((fact) => fact.input_state === "estimated").length;
              const hasSecChanges = rowFacts.some((fact) => fact.sec_changed);
              const active = security.id === selectedId;
              return <button type="button" key={security.id} aria-current={active ? "true" : undefined} onClick={() => { setSelectedId(security.id); setTab("facts"); setFeedback(""); }}
                className={`block w-full border-b border-border px-4 py-3 text-start transition-colors ${active ? "border-s-[2px] border-s-[var(--brass)] bg-secondary" : "hover:bg-secondary/60"}`}>
                <span className="flex items-center justify-between gap-3"><b className="font-mono text-sm" dir="ltr">{security.ticker}</b><span className="text-xs text-muted-foreground">{security.exchange_code ?? security.exchange_id ?? "—"}</span></span>
                <span className="mt-1 block truncate text-sm">{firm?.name_ar || firm?.name || "—"}</span>
                <span className="mt-2 flex flex-wrap justify-between gap-x-3 gap-y-1 text-[10px] text-muted-foreground">
                  <span>{period?.fiscal_period_label ?? "—"} · {text(locale, "Unknown")}: {ltr(formatNumber(unknowns, locale))} · {text(locale, "Estimated")}: {ltr(formatNumber(estimated, locale))}{hasSecChanges && <span className="ms-2 border border-[var(--brass)] px-1.5 py-0.5 text-[var(--brass)]">{text(locale, "SEC changed")}</span>}</span>
                  <span>{formatDate(security.last_ingest_at, locale, { dateStyle: "medium" })}</span>
                </span>
                {security.last_ingest_error && <span className="mt-2 block border-s-2 border-[var(--brass)] ps-2 text-xs text-muted-foreground">{text(locale, security.last_ingest_error)}</span>}
              </button>;
            })}
          </div>}
        </div>
        <form className="h-fit border border-border p-4" onSubmit={(event) => submit(event, (form) => {
          const ticker = String(form.get("ticker") ?? "").trim().toUpperCase();
          if (!ticker) return;
          setLookupError(""); setLookup(undefined); setLookupTicker(ticker);
          startTransition(async () => {
            const result = await financialAction({ operation: "lookup", data: { ticker } });
            if (!result.ok) setLookupError(result.error);
            else setLookup(result.lookup);
          });
        })}>
          <h3 className="flex items-center gap-2 text-sm font-medium"><Search size={15} aria-hidden="true" />{text(locale, "Add a security")}</h3>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">{text(locale, "Look up a US ticker before adding it to the curated universe.")}</p>
          <div className="mt-4 flex gap-2"><input className={inputClass} name="ticker" value={lookupTicker} onChange={(event) => setLookupTicker(event.target.value.toUpperCase())} aria-label={text(locale, "Ticker")} placeholder="AAPL" required dir="ltr" />
            <button className={buttonClass} type="submit" disabled={pending || !canEdit}><Search size={14} aria-hidden="true" />{text(locale, "Preview")}</button></div>
          {lookupError && <p role="alert" className="mt-3 text-sm text-destructive">{text(locale, lookupError)}</p>}
          {lookup && <div className="mt-4 border-t border-border pt-4">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs"><Meta locale={locale} label="CIK" value={lookup.cik} /><Meta locale={locale} label="Name" value={lookup.name} /><Meta locale={locale} label="Exchange" value={lookup.exchange} /><Meta locale={locale} label="Sector" value={lookup.sector} /><Meta locale={locale} label="Fiscal year end" value={lookup.fiscalYearEnd} /></dl>
            <button type="button" className={`${buttonClass} mt-4 w-full`} disabled={pending || !canEdit} onClick={() => run({ operation: "add", data: { ticker: lookup.ticker } }, "Security added and ingestion started.", (result) => { if (result.id) setSelectedId(result.id); setLookup(undefined); })}><Plus size={14} aria-hidden="true" />{text(locale, "Confirm and ingest")}</button>
          </div>}
          {!canEdit && <p className="mt-3 text-xs text-muted-foreground">{text(locale, "Editors have read-only access.")}</p>}
        </form>
      </div>
    </Panel>

    {selected && company && <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
        <div><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--byline)]">{text(locale, "Security record")}</p><h2 className="mt-1 text-2xl font-semibold">{company.name_ar || company.name} <bdi dir="ltr" className="font-mono text-base text-muted-foreground">({selected.ticker})</bdi></h2>
          <p className="mt-1 text-xs text-muted-foreground">{selected.slug} · {latestPeriod?.fiscal_period_label ?? text(locale, "No latest period")} · {formatDate(latestPeriod?.period_end, locale)}</p></div>
        <span className="border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-wider">{selected.in_universe ? text(locale, "In universe") : text(locale, "Outside universe")}</span>
      </div>
      <nav aria-label={text(locale, "Security details")} className="flex gap-1 overflow-x-auto border-b border-border">
        {(["facts", "segments", "prices", "coverage", "company"] as Tab[]).map((id) => <button type="button" key={id} aria-current={tab === id ? "page" : undefined} onClick={() => { setTab(id); setFactEditor(null); setSegmentEditor(null); }}
          className={`min-h-10 shrink-0 border-b-2 px-4 text-xs ${tab === id ? "border-[var(--brass)] text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{text(locale, id === "facts" ? "Facts" : id === "segments" ? "Segments" : id === "prices" ? "Prices" : id === "coverage" ? "Coverage" : "Company")}</button>)}
      </nav>
      {tab === "facts" && <FactsPanel locale={locale} facts={facts} periodDate={latestPeriod?.period_end ?? null} sources={data.sources} canEdit={canEdit} pending={pending} editor={factEditor} setEditor={setFactEditor} selectedId={selected.id} run={run} />}
      {tab === "segments" && <SegmentsPanel locale={locale} segments={segments} sources={data.sources} canEdit={canEdit} pending={pending} editor={segmentEditor} setEditor={setSegmentEditor} selectedId={selected.id} run={run} />}
      {tab === "prices" && <PricesPanel locale={locale} prices={data.prices.filter((item) => item.security_id === selected.id)} sharesKnown={facts.some((fact) => fact.line_item === "shares_outstanding" && fact.value !== null && fact.input_state !== "unknown")} canEdit={canEdit} pending={pending} selectedId={selected.id} run={run} />}
      {tab === "coverage" && <Panel locale={locale} title="Analyst coverage"><Coverage locale={locale} security={selected} analysts={data.analysts} canEdit={canEdit} pending={pending} run={run} /></Panel>}
      {tab === "company" && <div className="space-y-4"><Panel locale={locale} title="Company profile"><form className="grid gap-4 md:grid-cols-2" onSubmit={(event) => submit(event, companyUpdate)}>
        <Field label={text(locale, "Arabic name")}><input className={inputClass} name="name_ar" defaultValue={company.name_ar ?? ""} readOnly={!canEdit} /></Field>
        <Field label={text(locale, "English name")}><input className={inputClass} value={company.name} readOnly /></Field>
        <Field label={text(locale, "Arabic description")}><textarea className={`${inputClass} min-h-28`} name="description_ar" defaultValue={company.description_ar ?? ""} readOnly={!canEdit} /></Field>
        <Field label={text(locale, "English description")}><textarea className={`${inputClass} min-h-28`} name="description_en" defaultValue={company.description_en ?? ""} readOnly={!canEdit} /></Field>
        {canEdit && <div className="md:col-span-2"><button className={buttonClass} type="submit" disabled={pending}>{text(locale, "Save company fields")}</button></div>}
        {!canEdit && <p className="text-xs text-muted-foreground">{text(locale, "Editors have read-only access.")}</p>}
      </form></Panel>
      <Panel locale={locale} title="Universe membership" aside={<button type="button" disabled={!canEdit || pending || !selected.in_universe} className={`${buttonClass} border-destructive/50`} onClick={() => setRemoving(true)}><Trash2 size={14} aria-hidden="true" />{text(locale, "Remove from universe")}</button>}>
        <p className="text-sm leading-6 text-muted-foreground">{text(locale, "Removing a security keeps its historical records and removes it from the curated universe.")}</p>
        {removing && <div role="group" aria-labelledby="remove-title" className="mt-4 border border-destructive/50 p-4">
          <h3 id="remove-title" className="font-medium">{text(locale, "Confirm removal")}</h3><p className="mt-2 text-sm text-muted-foreground">{text(locale, "This security will no longer be part of the curated universe.")}</p>
          <div className="mt-4 flex gap-2"><button type="button" className={buttonClass} onClick={() => setRemoving(false)}>{text(locale, "Cancel")}</button><button type="button" className={`${buttonClass} border-destructive/50`} disabled={pending} onClick={() => run({ operation: "remove", securityId: selected.id, data: { confirm: true } }, "Security removed from universe.", () => setRemoving(false))}>{text(locale, "Confirm removal")}</button></div>
        </div>}
      </Panel></div>}
    </section>}
    {!selected && data.securities.length > 0 && <Empty>{text(locale, "Select a security to inspect its records.")}</Empty>}
  </main>;
}

function Heading({ locale, role, title, intro }: { locale: Locale; role: string; title: string; intro: string }) {
  return <header className="relative overflow-hidden border border-border bg-card">
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 end-0 w-1/3 opacity-25" style={{ background: "linear-gradient(140deg, transparent, var(--brass), transparent)" }} />
    <div className="relative flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
      <div><p className="font-mono text-[10px] tracking-[0.2em] text-[var(--byline)]">SUHAIL / FINANCIAL DATA</p><h1 className="mt-2 text-3xl font-semibold">{text(locale, title)}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{text(locale, intro)}</p></div>
      <span className="inline-flex min-h-9 items-center gap-2 border border-border px-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{role === "admin" ? <ShieldCheck size={14} aria-hidden="true" /> : <LockKeyhole size={14} aria-hidden="true" />}{text(locale, role)}</span>
    </div>
  </header>;
}
function Status({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <p role="status" className="border-s-2 border-[var(--brass)] bg-card px-4 py-3 text-sm" lang={locale === "ar" ? "en" : undefined} dir={locale === "ar" ? "ltr" : undefined}>{children}</p>;
}
function Meta({ locale, label, value }: { locale: Locale; label: string; value: ReactNode }) {
  return <div className="min-w-0"><dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{text(locale, label)}</dt><dd className="mt-1 break-words text-sm">{value || "—"}</dd></div>;
}
type Run = (command: FinancialCommand, success: string, onSuccess?: (result: Extract<FinancialResult, { ok: true }>) => void) => void;

function FactsPanel({ locale, facts, periodDate, sources, canEdit, pending, editor, setEditor, selectedId, run }: {
  locale: Locale; facts: FinancialAdminData["facts"]; periodDate: string | null; sources: FinancialAdminData["sources"]; canEdit: boolean; pending: boolean;
  editor: { id: string; mode: "override" | "confirm" } | null; setEditor: (value: { id: string; mode: "override" | "confirm" } | null) => void; selectedId: string; run: Run;
}) {
  const getSource = (id: string | null) => sources.find((source) => source.id === id);
  return <Panel locale={locale} title="Current facts">
    {facts.filter((fact) => fact.is_current).length === 0 ? <Empty>{text(locale, "No facts are recorded for this period.")}</Empty> : <div className="space-y-3">{facts.filter((fact) => fact.is_current).map((fact) => {
      const source = getSource(fact.source_id);
      const extensions = fact as typeof fact & { origin?: string; protected_current?: boolean; calculation_version?: string };
      const alternatives = facts.filter((candidate) => candidate.line_item === fact.line_item && !candidate.is_current && (candidate as typeof candidate & { origin?: string }).origin === "sec");
      const secChanged = Boolean(fact.sec_changed);
      const canConfirm = fact.line_item === "interest_bearing_investments" && fact.input_state === "estimated";
      return <article key={fact.id} className="border border-border p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="font-medium">{fact.label || fact.line_item}</h3>
            <span className={`border px-2 py-1 font-mono text-[10px] ${secChanged ? "border-[var(--brass)] text-[var(--brass)]" : "border-border text-muted-foreground"}`}>{secChanged ? text(locale, "SEC changed") : text(locale, fact.input_state)}</span>
          </div><p className="mt-2 text-xs text-muted-foreground">{text(locale, "State")}: {text(locale, fact.input_state)} · {text(locale, "Tier")}: {text(locale, fact.confidence_tier)} · {text(locale, "Source")}: {source?.label ?? "—"}</p>
            <p className="mt-1 text-xs text-muted-foreground">{text(locale, "Date")}: {formatDate(fact.as_of_date ?? periodDate, locale)} · {text(locale, "Origin")}: {extensions.origin ?? "—"} · {text(locale, "Protected current")}: {extensions.protected_current ? text(locale, "Yes") : text(locale, "No")}{fact.mapping_note && <> · {text(locale, "Mapping note")}: {fact.mapping_note}</>}</p>
            {fact.unknown_note && <p className="mt-1 text-xs text-muted-foreground">{text(locale, "Note")}: {fact.unknown_note}</p>}
            {source?.notes && <p className="mt-1 text-xs text-muted-foreground">{text(locale, "Source notes")}: {source.notes}</p>}
            {extensions.calculation_version && <p className="mt-1 font-mono text-[10px] text-muted-foreground" dir="ltr">calc {extensions.calculation_version}</p>}
            {source?.source_url && <a href={source.source_url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs underline underline-offset-4">{text(locale, "Open source")}<ArrowUpRight size={12} aria-hidden="true" /></a>}
          </div>
          <strong className="font-mono text-lg tabular-nums" dir="ltr">{fact.value === null ? "—" : formatNumber(Number(fact.value), locale, { maximumFractionDigits: 4 })}{fact.currency ? ` ${fact.currency}` : ""}</strong>
        </div>
        {alternatives.length > 0 && <div className="mt-3 border-t border-border pt-3"><p className="text-xs font-medium">{text(locale, "Retained SEC alternatives")}</p>{alternatives.map((alt) => <div key={alt.id} className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span dir="ltr" className="font-mono">{String(alt.value ?? "—")} · {alt.mapping_note ?? alt.line_item} · {getSource(alt.source_id)?.label ?? "—"}</span>
          {canEdit && <button type="button" className={buttonClass} disabled={pending} onClick={() => run({ operation: "accept", securityId: selectedId, data: { factId: alt.id } }, "SEC alternative accepted.")}>{text(locale, "Accept SEC")}</button>}
        </div>)}</div>}
        {canEdit && <div className="mt-4 flex flex-wrap gap-2"><button type="button" className={buttonClass} onClick={() => setEditor(editor?.id === fact.id ? null : { id: fact.id, mode: "override" })}>{text(locale, "Override")}</button>
          {canConfirm && <button type="button" className={buttonClass} onClick={() => setEditor(editor?.id === fact.id ? null : { id: fact.id, mode: "confirm" })}><FileCheck2 size={13} aria-hidden="true" />{text(locale, "Confirm from filing")}</button>}</div>}
        {editor?.id === fact.id && <FactForm key={`${fact.id}-${editor.mode}`} locale={locale} fact={fact} mode={editor.mode} pending={pending} selectedId={selectedId} run={run} close={() => setEditor(null)} />}
      </article>;
    })}</div>}
    {!canEdit && <p className="mt-4 text-xs text-muted-foreground">{text(locale, "Editors have read-only access.")}</p>}
  </Panel>;
}
function FactForm({ locale, fact, mode, pending, selectedId, run, close }: { locale: Locale; fact: FinancialAdminData["facts"][number]; mode: "override" | "confirm"; pending: boolean; selectedId: string; run: Run; close: () => void }) {
  const [sourceType, setSourceType] = useState(mode === "confirm" ? "regulatory_filing" : "internal");
  return <form className="mt-4 grid gap-3 border-t border-border pt-4 md:grid-cols-2" onSubmit={(event) => {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    const sourceType = String(form.get("source_type"));
    const data = {
      factId: fact.id,
      ...(mode === "override" ? { value: String(form.get("value") ?? "") || null, input_state: String(form.get("input_state")), confidence_tier: String(form.get("confidence_tier")) } : {}),
      reason: String(form.get("reason") ?? ""),
      source: { label: String(form.get("label") ?? ""), source_type: mode === "confirm" ? "regulatory_filing" : sourceType, source_url: String(form.get("source_url") ?? "") || undefined, document_reference: String(form.get("document_reference") ?? "") || undefined },
    };
    run({ operation: mode, securityId: selectedId, data }, mode === "confirm" ? "Filing confirmation saved." : "Override saved.", close);
  }}>
    <h4 className="md:col-span-2 text-sm font-medium">{text(locale, mode === "override" ? "New fact override" : "Filing confirmation")}</h4>
    {mode === "override" && <><Field label={text(locale, "Value")}><input className={inputClass} name="value" defaultValue={fact.value ?? ""} inputMode="decimal" /></Field>
      <Field label={text(locale, "Input state")}><select className={inputClass} name="input_state" defaultValue={fact.input_state}>{states.map((state) => <option key={state}>{state}</option>)}</select></Field>
      <Field label={text(locale, "Confidence tier")}><select className={inputClass} name="confidence_tier" defaultValue={fact.confidence_tier}>{tiers.map((tier) => <option key={tier}>{tier}</option>)}</select></Field>
      <Field label={text(locale, "Source type")}><select className={inputClass} name="source_type" value={sourceType} onChange={(event) => setSourceType(event.target.value)}><option value="internal">{text(locale, "internal")}</option><option value="regulatory_filing">{text(locale, "regulatory_filing")}</option></select></Field></>}
    <Field label={text(locale, "Source label")}><input className={inputClass} name="label" required /></Field>
    <Field label={text(locale, "Filing note reference")}><input className={inputClass} name="document_reference" required={mode === "confirm" || sourceType === "regulatory_filing"} /></Field>
    <Field label={text(locale, "Source URL")}><input className={inputClass} name="source_url" type="url" required={mode === "confirm" || sourceType === "regulatory_filing"} /></Field>
    <Field label={text(locale, "Reason (required)")}><textarea className={`${inputClass} min-h-20`} name="reason" required /></Field>
    <div className="flex gap-2 md:col-span-2"><button type="submit" className={buttonClass} disabled={pending}>{text(locale, "Save")}</button><button type="button" className={buttonClass} onClick={close}>{text(locale, "Cancel")}</button></div>
  </form>;
}

function SegmentsPanel({ locale, segments, sources, canEdit, pending, editor, setEditor, selectedId, run }: {
  locale: Locale; segments: FinancialAdminData["segments"]; sources: FinancialAdminData["sources"]; canEdit: boolean; pending: boolean; editor: string | "new" | null;
  setEditor: (value: string | "new" | null) => void; selectedId: string; run: Run;
}) {
  const unclassified = segments.some((segment) => segment.activity_category === "unclassified");
  return <Panel locale={locale} title="Business segments" aside={canEdit && <button type="button" className={buttonClass} onClick={() => setEditor(editor === "new" ? null : "new")}><Plus size={14} aria-hidden="true" />{text(locale, "Add segment")}</button>}>
    {unclassified && <p className="mb-4 flex items-start gap-2 border-s-2 border-[var(--brass)] bg-secondary px-4 py-3 text-sm"><AlertTriangle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />{text(locale, "One or more segments are unclassified; classify them using filing evidence.")}</p>}
    {segments.length === 0 ? <Empty>{text(locale, "No business segments are recorded for the latest period.")}</Empty> : <div className="divide-y divide-border border-y border-border">{segments.map((segment) => {
      const source = sources.find((item) => item.id === segment.source_id);
      return <article key={segment.id} className="py-4"><div className="flex flex-wrap items-start justify-between gap-3">
        <div><h3 className="font-medium">{segment.segment_name}</h3><p className="mt-1 text-xs text-muted-foreground">{text(locale, segment.activity_category)} · {text(locale, "State")}: {text(locale, segment.input_state)} · {text(locale, "Tier")}: {text(locale, segment.confidence_tier)}</p>
          {segment.description && <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{segment.description}</p>}
          <p className="mt-2 text-xs text-muted-foreground">{text(locale, "Category basis")}: {segment.category_basis || "—"} · {text(locale, "Source")}: {source?.label ?? "—"} · {text(locale, "Source notes")}: {source?.notes ?? "—"}</p>
        </div><bdi dir="ltr" className="font-mono text-sm">{segment.revenue_amount === null ? "—" : formatNumber(Number(segment.revenue_amount), locale)} · {segment.revenue_share === null ? "—" : formatNumber(Number(segment.revenue_share) * 100, locale, { maximumFractionDigits: 2 }) + "%"}</bdi>
      </div>
      {canEdit && <div className="mt-3 flex gap-2"><button type="button" className={buttonClass} onClick={() => setEditor(editor === segment.id ? null : segment.id)}>{text(locale, "Edit")}</button><button type="button" className={buttonClass} disabled={pending} onClick={() => { if (window.confirm(text(locale, "Delete this segment?"))) run({ operation: "deleteSegment", securityId: selectedId, data: { id: segment.id } }, "Segment deleted."); }}><Trash2 size={13} aria-hidden="true" />{text(locale, "Delete")}</button></div>}
      {editor === segment.id && <SegmentForm locale={locale} segment={segment} sources={sources} selectedId={selectedId} pending={pending} run={run} close={() => setEditor(null)} />}
      </article>;
    })}</div>}
    {editor === "new" && <SegmentForm locale={locale} sources={sources} selectedId={selectedId} pending={pending} run={run} close={() => setEditor(null)} />}
    {!canEdit && <p className="mt-4 text-xs text-muted-foreground">{text(locale, "Editors have read-only access.")}</p>}
  </Panel>;
}
function SegmentForm({ locale, segment, sources, selectedId, pending, run, close }: { locale: Locale; segment?: FinancialAdminData["segments"][number]; sources: FinancialAdminData["sources"]; selectedId: string; pending: boolean; run: Run; close: () => void }) {
  const linkedSource = sources.find((source) => source.id === segment?.source_id);
  const [category, setCategory] = useState<string>(segment?.activity_category ?? "unclassified");
  const [sourceType, setSourceType] = useState(linkedSource?.source_type === "internal" ? "internal" : "regulatory_filing");
  return <form className="mt-4 grid gap-3 border border-border p-4 md:grid-cols-2" onSubmit={(event) => {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    const sourceType = String(form.get("source_type"));
    run({ operation: "segment", securityId: selectedId, data: {
      ...(segment ? { id: segment.id } : {}), segment_name: String(form.get("segment_name")), description: String(form.get("description") ?? "") || undefined,
      revenue_amount: String(form.get("revenue_amount") ?? "") || null, activity_category: String(form.get("activity_category")),
      category_basis: String(form.get("category_basis") ?? "") || undefined, input_state: String(form.get("input_state")), confidence_tier: String(form.get("confidence_tier")),
      source: { label: String(form.get("label") ?? ""), source_type: sourceType, source_url: String(form.get("source_url") ?? "") || undefined, document_reference: String(form.get("document_reference") ?? "") || undefined },
    } }, "Segment saved.", close);
  }}>
    <h3 className="md:col-span-2 font-medium">{text(locale, segment ? "Edit segment" : "New segment")}</h3>
    <Field label={text(locale, "Segment name")}><input className={inputClass} name="segment_name" defaultValue={segment?.segment_name ?? ""} required /></Field>
    <Field label={text(locale, "Revenue amount")}><input className={inputClass} name="revenue_amount" inputMode="decimal" defaultValue={segment?.revenue_amount ?? ""} /></Field>
    <Field label={text(locale, "Description")}><textarea className={`${inputClass} min-h-20`} name="description" defaultValue={segment?.description ?? ""} /></Field>
    <Field label={text(locale, "Activity category")}><select className={inputClass} name="activity_category" value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item} value={item}>{text(locale, item)}</option>)}</select></Field>
    <Field label={text(locale, "Category basis")}><textarea className={`${inputClass} min-h-20`} name="category_basis" required={category !== "unclassified"} defaultValue={segment?.category_basis ?? ""} /></Field>
    <Field label={text(locale, "Input state")}><select className={inputClass} name="input_state" defaultValue={segment?.input_state ?? "reported"}>{states.map((state) => <option key={state} value={state}>{text(locale, state)}</option>)}</select></Field>
    <Field label={text(locale, "Confidence tier")}><select className={inputClass} name="confidence_tier" defaultValue={segment?.confidence_tier ?? "Verified"}>{tiers.map((tier) => <option key={tier} value={tier}>{text(locale, tier)}</option>)}</select></Field>
    <Field label={text(locale, "Source type")}><select className={inputClass} name="source_type" value={sourceType} onChange={(event) => setSourceType(event.target.value)}><option value="regulatory_filing">{text(locale, "regulatory_filing")}</option><option value="internal">{text(locale, "internal")}</option></select></Field>
    <Field label={text(locale, "Source label")}><input className={inputClass} name="label" defaultValue={linkedSource?.label ?? ""} required /></Field>
    <Field label={text(locale, "Filing note reference")}><input className={inputClass} name="document_reference" defaultValue={linkedSource?.document_reference ?? ""} required={sourceType === "regulatory_filing"} /></Field>
    <Field label={text(locale, "Source URL")}><input className={inputClass} name="source_url" type="url" defaultValue={linkedSource?.source_url ?? ""} required={sourceType === "regulatory_filing"} /></Field>
    <div className="flex gap-2 md:col-span-2"><button type="submit" disabled={pending} className={buttonClass}>{text(locale, "Save segment")}</button><button type="button" onClick={close} className={buttonClass}>{text(locale, "Cancel")}</button></div>
  </form>;
}

function PricesPanel({ locale, prices, sharesKnown, canEdit, pending, selectedId, run }: { locale: Locale; prices: FinancialAdminData["prices"]; sharesKnown: boolean; canEdit: boolean; pending: boolean; selectedId: string; run: Run }) {
  return <Panel locale={locale} title="Manual price history">
    {!sharesKnown && <p role="note" className="mb-4 border-s-2 border-[var(--brass)] bg-secondary px-4 py-3 text-sm leading-6">{text(locale, "Shares outstanding are unknown or missing. A market-cap fact cannot be derived from a close until shares are available.")}</p>}
    {canEdit && <form className="mb-5 grid gap-3 border-b border-border pb-5 md:grid-cols-3" onSubmit={(event) => {
      event.preventDefault(); const form = new FormData(event.currentTarget);
      run({ operation: "price", securityId: selectedId, data: { date: String(form.get("date")), close: String(form.get("close")), currency: String(form.get("currency")), source_label: String(form.get("source_label")), source_url: String(form.get("source_url") ?? "") || undefined } }, "Manual close saved.");
    }}>
      <Field label={text(locale, "Date")}><input className={inputClass} name="date" type="date" required /></Field>
      <Field label={text(locale, "Close")}><input className={inputClass} name="close" type="number" step="any" min="0" required /></Field>
      <Field label={text(locale, "Currency")}><input className={inputClass} name="currency" defaultValue="USD" required /></Field>
      <Field label={text(locale, "Source label")}><input className={inputClass} name="source_label" required /></Field>
      <Field label={text(locale, "Source URL")}><input className={inputClass} name="source_url" type="url" /></Field>
      <div className="flex items-end"><button className={buttonClass} type="submit" disabled={pending}>{text(locale, "Save close")}</button></div>
    </form>}
    {prices.length === 0 ? <Empty>{text(locale, "No manual prices are recorded.")}</Empty> : <div className="overflow-x-auto"><table className="w-full min-w-[560px] text-sm"><thead><tr className="border-b border-border text-xs text-muted-foreground">{["Date", "Close", "Currency", "Source", "Provenance"].map((item) => <th key={item} className="px-3 py-3 text-start font-medium">{text(locale, item)}</th>)}</tr></thead><tbody>{prices.sort((a, b) => String(b.date).localeCompare(String(a.date))).map((price) => {
      const provenance = price as typeof price & { source_url?: string | null; source_id?: string | null };
      return <tr key={price.id} className="border-b border-border"><td className="px-3 py-3">{formatDate(price.date, locale)}</td><td className="px-3 py-3 font-mono" dir="ltr">{price.close === null ? "—" : formatNumber(Number(price.close), locale)}</td><td className="px-3 py-3">{price.currency ?? "—"}</td><td className="px-3 py-3">{price.source_label ?? "—"}</td><td className="px-3 py-3">{provenance.source_url ? <a href={provenance.source_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline">{text(locale, "Open source")}<ArrowUpRight size={12} aria-hidden="true" /></a> : provenance.source_id ?? "—"}</td></tr>;
    })}</tbody></table></div>}
    {!canEdit && <p className="mt-4 text-xs text-muted-foreground">{text(locale, "Editors have read-only access.")}</p>}
  </Panel>;
}

function Coverage({ locale, security, analysts, canEdit, pending, run }: { locale: Locale; security: FinancialAdminData["securities"][number]; analysts: FinancialAdminData["analysts"]; canEdit: boolean; pending: boolean; run: Run }) {
  return <form className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]" onSubmit={(event) => {
    event.preventDefault(); const form = new FormData(event.currentTarget); const analystId = String(form.get("analystId") ?? "") || null;
    run({ operation: "coverage", securityId: security.id, data: { analystId } }, "Coverage assignment saved.");
  }}>
    <Field label={text(locale, "Assigned analyst")}><select name="analystId" className={inputClass} defaultValue={security.coverage_analyst_id ?? ""} disabled={!canEdit}><option value="">{text(locale, "No analyst assigned")}</option>{analysts.map((analyst) => <option key={analyst.id} value={analyst.id}>{analyst.name_ar} {analyst.name_en ? ` / ${analyst.name_en}` : ""}{analyst.active ? "" : ` (${text(locale, "inactive")})`}</option>)}</select></Field>
    {canEdit ? <div className="flex items-end"><button className={buttonClass} type="submit" disabled={pending}>{text(locale, "Save coverage")}</button></div> : <p className="text-xs text-muted-foreground">{text(locale, "Editors have read-only access.")}</p>}
    {security.coverage_started_at && <p className="text-xs text-muted-foreground sm:col-span-2">{text(locale, "Coverage started")}: {formatDate(security.coverage_started_at, locale, { dateStyle: "medium", timeStyle: "short" })}</p>}
  </form>;
}
