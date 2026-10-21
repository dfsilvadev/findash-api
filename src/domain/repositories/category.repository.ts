import type {
  CategoryResponse,
  CreateCategoryInput
} from "../entities/category.entity.js";

export interface CategoryRepository {
  create(input: CreateCategoryInput): Promise<CategoryResponse>;
}
