import { DeleteTransactionUseCase } from "../../../application/use-cases/transactions/delete-transaction.use-case.js";

import { makeAccountRepository } from "../accounts/make-account.repository.js";
import { makeTransactionRepository } from "./make-transaction.repository.js";

export function makeDeleteTransactionUseCase() {
  const transactionRepository = makeTransactionRepository();
  const accountRepository = makeAccountRepository();

  return new DeleteTransactionUseCase(transactionRepository, accountRepository);
}
