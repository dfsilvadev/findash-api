import { GetAccountBalanceUseCase } from "../../../application/use-cases/accounts/get-account-balance.use-case.js";

import { makeTransactionRepository } from "../transactions/make-transaction.repository.js";
import { makeAccountRepository } from "./make-account.repository.js";

export function makeGetAccountBalanceUseCase() {
  const transactionRepository = makeTransactionRepository();
  const accountRepository = makeAccountRepository();

  return new GetAccountBalanceUseCase(transactionRepository, accountRepository);
}
