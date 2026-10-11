import type { Locale } from "../i18n/routing";

const formats = { ar: "ar-u-ca-gregory-nu-latn", en: "en-US" } as const;
export function formatNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions,
) {
  return new Intl.NumberFormat(formats[locale], {
    ...options,
    numberingSystem: "latn",
  }).format(value);
}
/** Input is a fraction, e.g. -0.125 → -12.5%. */
export function formatPercent(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions,
) {
  return formatNumber(value, locale, {
    maximumFractionDigits: 2,
    ...options,
    style: "percent",
  });
}
/** unitScale explicitly declares the input's multiplier (1, 1_000, etc). */
export function formatMoney(
  value: number,
  locale: Locale,
  currency: string,
  unitScale: number,
) {
  if (!Number.isFinite(unitScale) || unitScale <= 0)
    throw new RangeError("unitScale must be positive and finite");
  return formatNumber(value * unitScale, locale, {
    style: "currency",
    currency,
  });
}
export function formatDate(
  value: Date | string,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions,
) {
  return new Intl.DateTimeFormat(formats[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
    calendar: "gregory",
    numberingSystem: "latn",
    timeZone: "UTC",
  }).format(new Date(value));
}
