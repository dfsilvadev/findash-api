import { prisma } from "../prisma.js";

import type {
  CategoryOwnerKey,
  CategoryResponse,
  CreateCategoryInput
} from "../../../../domain/entities/category.entity.js";
import type { CategoryRepository } from "../../../../domain/repositories/category.repository.js";
import type { Category } from "../../../../generated/prisma/client.js";

// The database column is still user_id (Prisma field userId); the domain calls it accountId
function toCategoryResponse({ userId, ...row }: Category): CategoryResponse {
  return { ...row, accountId: userId };
}

export class PrismaCategoryRepository implements CategoryRepository {
  async create({
    accountId,
    ...input
  }: CreateCategoryInput): Promise<CategoryResponse> {
    const row = await prisma.category.create({
      data: { ...input, userId: accountId }
    });
    return toCategoryResponse(row);
  }

  async findByIdAndAccountId({
    categoryId,
    accountId
  }: CategoryOwnerKey): Promise<CategoryResponse | null> {
    const row = await prisma.category.findFirst({
      where: { id: categoryId, userId: accountId }
    });
    return row ? toCategoryResponse(row) : null;
  }
}
