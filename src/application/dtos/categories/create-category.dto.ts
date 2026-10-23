export interface CreateCategoryInputDto {
  name: string;
  description?: string;
  type: "INCOME" | "EXPENSE" | "INVESTMENT";
  assetClass?: "FIXED_INCOME" | "VARIABLE_INCOME";
  accountId: string; // TODO: Use authentication context instead of passing accountId directly
}
