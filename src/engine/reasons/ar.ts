import type { StatusReason } from "../types";

/** Literal Arabic drafts only, isolated from decisions and from English storage. */
export function renderArabicDraft(reason: StatusReason): string {
  switch (reason.kind) {
    // AR-REVIEW: needs human Arabic drafting
    case "failure": return `⟦AR-REVIEW⟧ معيار ${reason.label}: لم يجتز الفحص. النسبة ${reason.ratio} والحد ${reason.threshold}. رمز السبب: ${reason.reasonCode}.`;
    // AR-REVIEW: needs human Arabic drafting
    case "borderline": return `⟦AR-REVIEW⟧ معيار ${reason.label}: نتيجة حدية. النسبة ${reason.ratio} والحد ${reason.threshold}. رمز السبب: ${reason.reasonCode}.`;
    // AR-REVIEW: needs human Arabic drafting
    case "criterion_unknown": return `⟦AR-REVIEW⟧ معيار ${reason.label}: النتيجة غير معروفة. رمز السبب: ${reason.reasonCode}.`;
    // AR-REVIEW: needs human Arabic drafting
    case "blocking_unknown": return `⟦AR-REVIEW⟧ ${reason.field}: بيانات لازمة غير متاحة؛ لا تُفترض قيمة. رمز السبب: ${reason.reasonCode}.`;
    // AR-REVIEW: needs human Arabic drafting
    case "review_unknown": return `⟦AR-REVIEW⟧ ${reason.field}: يلزم مراجعة البيانات. رمز السبب: ${reason.reasonCode}.`;
    // AR-REVIEW: needs human Arabic drafting
    case "counts": return `⟦AR-REVIEW⟧ عدد المعايير الحدية: ${reason.borderlineCount}؛ عدد المعايير غير المعروفة: ${reason.unknownCount}.`;
  }
}
