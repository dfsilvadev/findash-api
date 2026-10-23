export type CategoryType = "INCOME" | "EXPENSE" | "INVESTMENT";

export type AssetClass = "FIXED_INCOME" | "VARIABLE_INCOME";

export interface CreateCategoryInput {
  name: string;
  description?: string;
  type: CategoryType;
  assetClass?: AssetClass;
  accountId: string;
}

export interface CategoryOwnerKey {
  categoryId: string;
  accountId: string;
}

export interface CategoryResponse {
  id: string;
  name: string;
  description?: string | null;
  type: CategoryType;
  assetClass?: AssetClass | null;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date | null;
}
