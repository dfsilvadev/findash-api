import { CreateTransactionUseCase } from "../../../application/use-cases/transactions/create-transaction.use-case.js";

import { makeAccountRepository } from "../accounts/make-account.repository.js";
import { makeTransactionRepository } from "./make-transaction.repository.js";

export function makeCreateTransactionUseCase() {
  const accountRepository = makeAccountRepository();
  const transactionRepository = makeTransactionRepository();

  return new CreateTransactionUseCase(accountRepository, transactionRepository);
}
