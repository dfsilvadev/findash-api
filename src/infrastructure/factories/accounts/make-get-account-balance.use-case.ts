import { GetAccountBalanceUseCase } from "../../../application/use-cases/accounts/get-account-balance.use-case.js";

import { makeAccountRepository } from "./make-account.repository.js";

export function makeGetAccountBalanceUseCase() {
  const accountRepository = makeAccountRepository();
  return new GetAccountBalanceUseCase(accountRepository);
}
