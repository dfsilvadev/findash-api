import { PrismaCategoryRepository } from "../persistence/prisma/repositories/prisma-category.repository.js";

export function makeCategoryRepository() {
  return new PrismaCategoryRepository();
}
