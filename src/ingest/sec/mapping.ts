/**
 * D-05/D-06: ordered, versioned mapping. Evidence and per-tag availability:
 * docs/SEC_ANNUAL_MAPPING.md (generated from the committed fixtures).
 * No persistence, sector classification, EBITDA, or screening formulas here.
 */
export const SEC_CALCULATION_VERSION = "calc-2026.10.2";
export const candidates = {
  // AAPL/MSFT use ExcludingAssessedTax; JPM uses Revenues. The other two
  // supplied alternatives remain supported but unverified in these samples.
  total_revenue: ["Revenues", "RevenueFromContractWithCustomerExcludingAssessedTax",
    "RevenueFromContractWithCustomerIncludingAssessedTax", "SalesRevenueNet"],
  total_assets: ["Assets"], // All three.
  // All three exercise StockholdersEquity; the first choice is sample-unverified.
  total_equity: ["StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest", "StockholdersEquity"],
  // D-44/D-113: aggregate replaces BOTH long-term components; leases excluded.
  interest_bearing_debt: ["LongTermDebt", "LongTermDebtNoncurrent", "LongTermDebtCurrent", "ShortTermBorrowings", "CommercialPaper"],
  // D-44/D-113: present components only, even a singleton is derived.
  finance_lease_liabilities: ["FinanceLeaseLiabilityCurrent", "FinanceLeaseLiabilityNoncurrent"],
  operating_lease_liabilities: ["OperatingLeaseLiabilityCurrent", "OperatingLeaseLiabilityNoncurrent"],
  // Explicit expansion of the attachment's unnamed "broader restricted-cash tag".
  cash_and_equivalents: ["CashAndCashEquivalentsAtCarryingValue",
    "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents"],
  // D-06: these labels do not prove interest-bearing status. Always estimated.
  interest_bearing_investments: ["ShortTermInvestments", "MarketableSecuritiesCurrent", "AvailableForSaleSecuritiesDebtSecuritiesCurrent"],
  accounts_receivable: ["AccountsReceivableNetCurrent"],
  net_income: ["NetIncomeLoss"],
  operating_cash_flow: ["NetCashProvidedByUsedInOperatingActivities"],
  // DEI is a cover-page instant, deliberately NOT the annual balance-sheet end.
  shares_outstanding: ["dei:EntityCommonStockSharesOutstanding"],
} as const;

export const durationItems = new Set(["total_revenue", "net_income", "operating_cash_flow"]);
export const sumItems = new Set(["interest_bearing_debt", "finance_lease_liabilities", "operating_lease_liabilities"]);
