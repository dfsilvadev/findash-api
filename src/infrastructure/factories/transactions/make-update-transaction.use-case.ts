import { UpdateTransactionUseCase } from "../../../application/use-cases/transactions/update-transaction.use-case.js";

import { makeCategoryRepository } from "../categories/make-category.repository.js";
import { makeAccountRepository } from "../accounts/make-account.repository.js";
import { makeTransactionRepository } from "./make-transaction.repository.js";

export function makeUpdateTransactionUseCase() {
  const transactionRepository = makeTransactionRepository();
  const accountRepository = makeAccountRepository();
  const categoryRepository = makeCategoryRepository();

  return new UpdateTransactionUseCase(
    transactionRepository,
    accountRepository,
    categoryRepository
  );
}
