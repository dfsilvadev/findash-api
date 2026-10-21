import { CreateTransactionUseCase } from "../../../application/use-cases/transactions/create-transaction.use-case.js";

import { makeUserRepository } from "../users/make-user.repository.js";
import { makeTransactionRepository } from "./make-transaction.repository.js";

export function makeCreateTransactionUseCase() {
  const userRepository = makeUserRepository();
  const transactionRepository = makeTransactionRepository();

  return new CreateTransactionUseCase(userRepository, transactionRepository);
}
