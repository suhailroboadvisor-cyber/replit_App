import { useTranslations } from "next-intl";
import type messages from "../../i18n/messages/en.json";
import { LocalizedText } from "../foundation";

export function MethodologyCopy({
  id,
}: {
  id: keyof typeof messages.publicMethodology;
}) {
  const t = useTranslations("publicMethodology");
  return <LocalizedText>{t(id)}</LocalizedText>;
}

export function formatMethodologyDate(value: string | null, locale: string) {
  if (!value) return "—";
  const date = new Date(`${value.slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-u-ca-gregory-nu-latn" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

