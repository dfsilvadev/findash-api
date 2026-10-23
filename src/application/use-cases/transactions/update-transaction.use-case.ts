import { AccountDoesNotExistError } from "../../../domain/errors/account-does-not-exist.error.js";
import { CategoryDoesNotExistError } from "../../../domain/errors/category-does-not-exist.error.js";
import { CategoryIsArchivedError } from "../../../domain/errors/category-is-archived.error.js";
import { CategoryTypeMismatchError } from "../../../domain/errors/category-type-mismatch.error.js";
import { TransactionDoesNotExistError } from "../../../domain/errors/transaction-does-not-exist.error.js";

import type { TransactionResponse } from "../../../domain/entities/transaction.entity.js";
import type { AccountRepository } from "../../../domain/repositories/account.repository.js";
import type { CategoryRepository } from "../../../domain/repositories/category.repository.js";
import type { TransactionRepository } from "../../../domain/repositories/transaction.repository.js";
import type { UpdateTransactionDto } from "../../dtos/transactions/update-transaction.dto.js";

export class UpdateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountRepository: AccountRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

  async execute(input: UpdateTransactionDto): Promise<TransactionResponse> {
    const { accountId, transactionId, ...changes } = input;

    const account = await this.accountRepository.findById(accountId);
    if (!account) throw new AccountDoesNotExistError(accountId);

    const transaction = await this.transactionRepository.findByIdAndAccountId({
      transactionId,
      accountId
    });
    if (!transaction) throw new TransactionDoesNotExistError(transactionId);

    const { categoryId, type } = changes;
    const categoryChanged =
      categoryId !== undefined && categoryId !== transaction.categoryId;

    if (categoryChanged || type !== undefined) {
      const finalCategoryId = categoryId ?? transaction.categoryId;
      const finalType = type ?? transaction.type;

      const category = await this.categoryRepository.findByIdAndAccountId({
        categoryId: finalCategoryId,
        accountId
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
      { transactionId, accountId },
      changes
    );
  }
}
