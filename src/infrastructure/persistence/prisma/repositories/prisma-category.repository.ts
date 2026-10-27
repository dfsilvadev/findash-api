import { prisma } from "../prisma.js";

import type { Category } from "../../../../domain/entities/category.entity.js";
import type {
  CategoryOwnerKey,
  CategoryRepository,
  CreateCategoryData
} from "../../../../domain/repositories/category.repository.js";
import type { Category as CategoryRow } from "../../../../generated/prisma/client.js";

// The database column is still user_id (Prisma field userId); the domain calls it accountId
function toCategory({ userId, ...row }: CategoryRow): Category {
  return { ...row, accountId: userId };
}

export class PrismaCategoryRepository implements CategoryRepository {
  async create({ accountId, ...data }: CreateCategoryData): Promise<Category> {
    const row = await prisma.category.create({
      data: { ...data, userId: accountId }
    });
    return toCategory(row);
  }

  async findByIdAndAccountId({
    categoryId,
    accountId
  }: CategoryOwnerKey): Promise<Category | null> {
    const row = await prisma.category.findFirst({
      where: { id: categoryId, userId: accountId }
    });
    return row ? toCategory(row) : null;
  }
}
