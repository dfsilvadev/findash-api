export const FinancialType = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
  INVESTMENT: "INVESTMENT"
} as const;

export type FinancialType = (typeof FinancialType)[keyof typeof FinancialType];
