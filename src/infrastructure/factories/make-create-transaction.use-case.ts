import { CreateTransactionUseCase } from "../../application/use-cases/transactions/create-transaction.use-case.js";

import { makeTransactionRepository } from "./make-transaction-repository.js";
import { makeUserRepository } from "./make-user.repository.js";

export function makeCreateTransactionUseCase() {
  const userRepository = makeUserRepository();
  const transactionRepository = makeTransactionRepository();

  return new CreateTransactionUseCase(userRepository, transactionRepository);
}
