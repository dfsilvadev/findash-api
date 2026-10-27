import type {
  CategoryAssetClass,
  CategoryType
} from "../../../domain/entities/category.entity.js";

export interface CreateCategoryInput {
  name: string;
  description?: string;
  type: CategoryType;
  assetClass?: CategoryAssetClass;
  accountId: string; // TODO: Use authentication context instead of passing accountId directly
}
