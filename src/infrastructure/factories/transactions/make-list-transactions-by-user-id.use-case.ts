import { ListTransactionsByUserIdUseCase } from "../../../application/use-cases/transactions/list-transactions-by-user-id.use-case.js";

import { makeUserRepository } from "../users/make-user.repository.js";
import { makeTransactionRepository } from "./make-transaction.repository.js";

export function makeListTransactionsByUserIdUseCase() {
  const transactionRepository = makeTransactionRepository();
  const userRepository = makeUserRepository();

  return new ListTransactionsByUserIdUseCase(
    transactionRepository,
    userRepository
  );
}
