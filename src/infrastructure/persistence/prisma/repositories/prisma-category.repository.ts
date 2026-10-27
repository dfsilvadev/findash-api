import { prisma } from "../prisma.js";

import type { Category } from "../../../../domain/entities/category.entity.js";
import type {
  CategoryOwnerKey,
  CategoryRepository,
  CreateCategoryData
} from "../../../../domain/repositories/category.repository.js";

export class PrismaCategoryRepository implements CategoryRepository {
  async create(data: CreateCategoryData): Promise<Category> {
    const row = await prisma.category.create({ data });
    return row;
  }

  async findByIdAndAccountId({
    categoryId,
    accountId
  }: CategoryOwnerKey): Promise<Category | null> {
    const row = await prisma.category.findFirst({
      where: { id: categoryId, accountId }
    });
    return row;
  }
}
