// JSON fields retain structured evidence, not translated prose or inferred values.
export type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
export type JsonObject = { [key: string]: JsonValue };
export type StatusReason = {
  kind: string;
  criterion_id: string | null;
  criterion_label: string | null;
  ratio: number | null;
  threshold: number | null;
  reason_code: string;
};
export type EditorEvidence = {
  claim_ar: string;
  claim_en?: string | null;
  source_id: string;
  value: JsonValue;
};
export type WorkflowEntry = {
  status: string;
  at: string;
  actor_id?: string;
  note?: string;
};
export type TreatmentRuleData = {
  prohibited_categories?: string[];
  non_permissible_categories?: string[];
};
export type PurificationTreatment = {
  formula: string;
  inputs: string[];
  example_ratio: number;
  confidence_tier: "Estimated";
  verified: false;
};
export type HashPayload = {
  engine_version: string;
  calculation_version: string;
  security_id: string;
  methodology_version_id: string;
  financial_period_id: string | null;
  facts: JsonObject[];
  segments: JsonObject[];
  criteria: JsonObject[];
  outputs: JsonObject;
};
