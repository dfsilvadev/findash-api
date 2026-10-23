import { DeleteTransactionUseCase } from "../../../application/use-cases/transactions/delete-transaction.use-case.js";

import { makeUserRepository } from "../users/make-user.repository.js";
import { makeTransactionRepository } from "./make-transaction.repository.js";

export function makeDeleteTransactionUseCase() {
  const transactionRepository = makeTransactionRepository();
  const userRepository = makeUserRepository();

  return new DeleteTransactionUseCase(transactionRepository, userRepository);
}
