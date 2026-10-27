import { CategoryIsArchivedError } from "../errors/category-is-archived.error.js";
import { CategoryTypeMismatchError } from "../errors/category-type-mismatch.error.js";

import type { Category } from "../entities/category.entity.js";
import type { TransactionType } from "../entities/transaction.entity.js";

interface AssertCategoryAcceptsTransactionParams {
  category: Category;
  transactionType: TransactionType;
  // Lets existing transactions keep being edited after their category is archived
  allowArchived?: boolean;
}

export function assertCategoryAcceptsTransaction({
  category,
  transactionType,
  allowArchived = false
}: AssertCategoryAcceptsTransactionParams): void {
  if (!allowArchived && category.archivedAt)
    throw new CategoryIsArchivedError(category.id);

  if (category.type !== transactionType)
    throw new CategoryTypeMismatchError(
      category.id,
      category.type,
      transactionType
    );
}
