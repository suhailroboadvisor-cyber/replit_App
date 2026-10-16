// D-89: expanded evidence-complete hash format; historic payloads still verify.
export const ENGINE_VERSION = "engine-1.0.1";
// D-89 changes hashing, not calculation rules or thresholds.
export const CALCULATION_VERSION = "calc-2026.10.1";
// D-06: SEC mapping provenance is explicit without changing screening formulas,
// defaults, historical payloads or golden hashes. Only these exact versions run.
export const SUPPORTED_CALCULATION_VERSIONS = [CALCULATION_VERSION, "calc-2026.10.2", "calc-2026.10.3"] as const;
