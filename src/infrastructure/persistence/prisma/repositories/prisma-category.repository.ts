import { prisma } from "../prisma.js";

import type {
  CategoryOwnerKey,
  CategoryResponse,
  CreateCategoryInput
} from "../../../../domain/entities/category.entity.js";
import type { CategoryRepository } from "../../../../domain/repositories/category.repository.js";

export class PrismaCategoryRepository implements CategoryRepository {
  async create(input: CreateCategoryInput): Promise<CategoryResponse> {
    const row = await prisma.category.create({
      data: input
    });
    return row;
  }

  async findByIdAndUserId({
    categoryId,
    userId
  }: CategoryOwnerKey): Promise<CategoryResponse | null> {
    const row = await prisma.category.findFirst({
      where: { id: categoryId, userId }
    });
    return row;
  }
}
