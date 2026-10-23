import { CategoryDoesNotExistError } from "../../../domain/errors/category-does-not-exist.error.js";
import { CategoryIsArchivedError } from "../../../domain/errors/category-is-archived.error.js";
import { CategoryTypeMismatchError } from "../../../domain/errors/category-type-mismatch.error.js";
import { TransactionDoesNotExistError } from "../../../domain/errors/transaction-does-not-exist.error.js";
import { UserDoesNotExistError } from "../../../domain/errors/user-does-not-exist.error.js";

import type { TransactionResponse } from "../../../domain/entities/transaction.entity.js";
import type { CategoryRepository } from "../../../domain/repositories/category.repository.js";
import type { TransactionRepository } from "../../../domain/repositories/transaction.repository.js";
import type { UserRepository } from "../../../domain/repositories/user.repository.js";
import type { UpdateTransactionDto } from "../../dtos/transactions/update-transaction.dto.js";

export class UpdateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly userRepository: UserRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

  async execute(input: UpdateTransactionDto): Promise<TransactionResponse> {
    const { userId, transactionId, ...changes } = input;

    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserDoesNotExistError(userId);

    const transaction = await this.transactionRepository.findByIdAndUserId({
      transactionId,
      userId
    });
    if (!transaction) throw new TransactionDoesNotExistError(transactionId);

    const { categoryId, type } = changes;
    const categoryChanged =
      categoryId !== undefined && categoryId !== transaction.categoryId;

    if (categoryChanged || type !== undefined) {
      const finalCategoryId = categoryId ?? transaction.categoryId;
      const finalType = type ?? transaction.type;

      const category = await this.categoryRepository.findByIdAndUserId({
        categoryId: finalCategoryId,
        userId
      });
      if (!category) throw new CategoryDoesNotExistError(finalCategoryId);

      if (categoryChanged && category.archivedAt)
        throw new CategoryIsArchivedError(finalCategoryId);

      if (category.type !== finalType)
        throw new CategoryTypeMismatchError(
          finalCategoryId,
          category.type,
          finalType
        );
    }

    return this.transactionRepository.update(
      { transactionId, userId },
      changes
    );
  }
}
