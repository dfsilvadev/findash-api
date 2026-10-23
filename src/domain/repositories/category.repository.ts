import type {
  CategoryOwnerKey,
  CategoryResponse,
  CreateCategoryInput
} from "../entities/category.entity.js";

export interface CategoryRepository {
  create(input: CreateCategoryInput): Promise<CategoryResponse>;
  findByIdAndUserId(key: CategoryOwnerKey): Promise<CategoryResponse | null>;
}
