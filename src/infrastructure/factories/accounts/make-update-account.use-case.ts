import { UpdateAccountUseCase } from "../../../application/use-cases/accounts/update-account.use-case.js";

import { makeAccountRepository } from "./make-account.repository.js";

export function makeUpdateAccountUseCase() {
  const accountRepository = makeAccountRepository();
  return new UpdateAccountUseCase(accountRepository);
}
