import { legalDocument } from "../../lib/auth/legal";
import { LocalizedText } from "../foundation";
import Markdown from "react-markdown";
import { reviewText } from "./types";
// Plain paragraphs/heading Markdown rendered as React text, never executable HTML.
export async function LegalDocument({
  kind,
  locale,
}: {
  kind: "terms" | "privacy";
  locale: string;
}) {
  const document = await legalDocument(kind, locale);
  return (
    <main id="content" className="mx-auto min-h-[45vh] max-w-3xl px-6 py-14">
      <h1 className="text-3xl">
        <LocalizedText>
          {reviewText(
            locale === "ar" ? "ar" : "en",
            kind === "terms" ? "Terms of Use" : "Privacy Policy",
          )}
        </LocalizedText>
      </h1>
      <p className="my-6 font-mono text-sm" dir="ltr">
        {document.version}
      </p>
      <article className="space-y-4">
        <Markdown skipHtml>{document.markdown}</Markdown>
      </article>
    </main>
  );
}
