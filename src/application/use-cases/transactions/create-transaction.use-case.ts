import { AccountDoesNotExistError } from "../../../domain/errors/account-does-not-exist.error.js";
import { CategoryDoesNotExistError } from "../../../domain/errors/category-does-not-exist.error.js";
import { assertCategoryAcceptsTransaction } from "../../../domain/policies/transaction-category.policy.js";

import type { AccountRepository } from "../../../domain/repositories/account.repository.js";
import type { CategoryRepository } from "../../../domain/repositories/category.repository.js";
import type { TransactionRepository } from "../../../domain/repositories/transaction.repository.js";
import type { CreateTransactionInput } from "../../dtos/transactions/create-transaction.dto.js";

export class CreateTransactionUseCase {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

  async execute(input: CreateTransactionInput): Promise<void> {
    const { accountId, categoryId, type } = input;

    const existingAccount = await this.accountRepository.findById(accountId);
    if (!existingAccount) throw new AccountDoesNotExistError(accountId);

    const existingCategory = await this.categoryRepository.findByIdAndAccountId(
      {
        categoryId,
        accountId
      }
    );
    if (!existingCategory) throw new CategoryDoesNotExistError(categoryId);

    assertCategoryAcceptsTransaction({
      category: existingCategory,
      transactionType: type
    });

    await this.transactionRepository.create(input);
  }
}
