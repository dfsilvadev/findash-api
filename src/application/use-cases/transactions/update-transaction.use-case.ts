import { AccountDoesNotExistError } from "../../../domain/errors/account-does-not-exist.error.js";
import { CategoryDoesNotExistError } from "../../../domain/errors/category-does-not-exist.error.js";
import { TransactionDoesNotExistError } from "../../../domain/errors/transaction-does-not-exist.error.js";
import { assertCategoryAcceptsTransaction } from "../../../domain/policies/transaction-category.policy.js";

import type { Transaction } from "../../../domain/entities/transaction.entity.js";
import type { AccountRepository } from "../../../domain/repositories/account.repository.js";
import type { CategoryRepository } from "../../../domain/repositories/category.repository.js";
import type { TransactionRepository } from "../../../domain/repositories/transaction.repository.js";
import type { UpdateTransactionInput } from "../../dtos/transactions/update-transaction.dto.js";

export class UpdateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountRepository: AccountRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

  async execute(input: UpdateTransactionInput): Promise<Transaction> {
    const { accountId, transactionId, ...changes } = input;

    const existingAccount = await this.accountRepository.findById(accountId);
    if (!existingAccount) throw new AccountDoesNotExistError(accountId);

    const existingTransaction =
      await this.transactionRepository.findByIdAndAccountId({
        transactionId,
        accountId
      });
    if (!existingTransaction)
      throw new TransactionDoesNotExistError(transactionId);

    const { categoryId, type } = changes;
    const categoryChanged =
      categoryId !== undefined && categoryId !== existingTransaction.categoryId;

    if (categoryChanged || type !== undefined) {
      const finalCategoryId = categoryId ?? existingTransaction.categoryId;
      const finalType = type ?? existingTransaction.type;

      const existingCategory =
        await this.categoryRepository.findByIdAndAccountId({
          categoryId: finalCategoryId,
          accountId
        });
      if (!existingCategory)
        throw new CategoryDoesNotExistError(finalCategoryId);

      assertCategoryAcceptsTransaction({
        category: existingCategory,
        transactionType: finalType,
        allowArchived: !categoryChanged
      });
    }

    return this.transactionRepository.update(
      { transactionId, accountId },
      changes
    );
  }
}
