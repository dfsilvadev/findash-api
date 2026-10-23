import { UpdateAccountStatusUseCase } from "../../../application/use-cases/accounts/update-account-status.use-case.js";

import { makeAccountRepository } from "./make-account.repository.js";

export function makeUpdateAccountStatusUseCase() {
  const accountRepository = makeAccountRepository();
  return new UpdateAccountStatusUseCase(accountRepository);
}
