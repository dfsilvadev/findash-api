import { GetAccountByIdUseCase } from "../../../application/use-cases/accounts/get-account-by-id.use-case.js";

import { makeAccountRepository } from "./make-account.repository.js";

export function makeGetAccountByIdUseCase() {
  const accountRepository = makeAccountRepository();
  return new GetAccountByIdUseCase(accountRepository);
}
