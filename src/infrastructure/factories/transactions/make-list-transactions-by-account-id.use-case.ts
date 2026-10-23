import { ListTransactionsByAccountIdUseCase } from "../../../application/use-cases/transactions/list-transactions-by-account-id.use-case.js";

import { makeAccountRepository } from "../accounts/make-account.repository.js";
import { makeTransactionRepository } from "./make-transaction.repository.js";

export function makeListTransactionsByAccountIdUseCase() {
  const transactionRepository = makeTransactionRepository();
  const accountRepository = makeAccountRepository();

  return new ListTransactionsByAccountIdUseCase(
    transactionRepository,
    accountRepository
  );
}
