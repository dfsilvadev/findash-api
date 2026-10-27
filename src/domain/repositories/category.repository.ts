import type {
  Category,
  CategoryAssetClass,
  CategoryType
} from "../entities/category.entity.js";

export interface CreateCategoryData {
  name: string;
  description?: string;
  type: CategoryType;
  assetClass?: CategoryAssetClass;
  accountId: string;
}

export interface CategoryOwnerKey {
  categoryId: string;
  accountId: string;
}

export interface CategoryRepository {
  create(data: CreateCategoryData): Promise<Category>;
  findByIdAndAccountId(key: CategoryOwnerKey): Promise<Category | null>;
}
