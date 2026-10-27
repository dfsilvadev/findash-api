import type { FinancialType } from "../shared/financial-type.js";

export type CategoryType = FinancialType;

export const CategoryAssetClass = {
  FIXED_INCOME: "FIXED_INCOME",
  VARIABLE_INCOME: "VARIABLE_INCOME"
} as const;

export type CategoryAssetClass =
  (typeof CategoryAssetClass)[keyof typeof CategoryAssetClass];

export interface Category {
  id: string;
  name: string;
  description: string | null;
  type: CategoryType;
  assetClass: CategoryAssetClass | null;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date | null;
}
