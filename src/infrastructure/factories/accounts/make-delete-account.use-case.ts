import { DeleteAccountUseCase } from "../../../application/use-cases/accounts/delete-account.use-case.js";

import { makeAccountRepository } from "./make-account.repository.js";

export function makeDeleteAccountUseCase() {
  const accountRepository = makeAccountRepository();
  return new DeleteAccountUseCase(accountRepository);
}
