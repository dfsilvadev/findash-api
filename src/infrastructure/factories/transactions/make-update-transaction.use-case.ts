import { UpdateTransactionUseCase } from "../../../application/use-cases/transactions/update-transaction.use-case.js";

import { makeCategoryRepository } from "../categories/make-category.repository.js";
import { makeUserRepository } from "../users/make-user.repository.js";
import { makeTransactionRepository } from "./make-transaction.repository.js";

export function makeUpdateTransactionUseCase() {
  const transactionRepository = makeTransactionRepository();
  const userRepository = makeUserRepository();
  const categoryRepository = makeCategoryRepository();

  return new UpdateTransactionUseCase(
    transactionRepository,
    userRepository,
    categoryRepository
  );
}
