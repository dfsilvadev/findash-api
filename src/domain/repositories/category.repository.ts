import type {
  CategoryOwnerKey,
  CategoryResponse,
  CreateCategoryInput
} from "../entities/category.entity.js";

export interface CategoryRepository {
  create(input: CreateCategoryInput): Promise<CategoryResponse>;
  findByIdAndAccountId(key: CategoryOwnerKey): Promise<CategoryResponse | null>;
}
