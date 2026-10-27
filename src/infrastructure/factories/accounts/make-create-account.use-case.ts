import { CreateAccountUseCase } from "../../../application/use-cases/accounts/create-account.use-case.js";

import { makeAccountRepository } from "./make-account.repository.js";
import { makePasswordHasher } from "./make-password.hasher.js";

export function makeCreateAccountUseCase() {
  const accountRepository = makeAccountRepository();
  const passwordHasher = makePasswordHasher();
  return new CreateAccountUseCase(accountRepository, passwordHasher);
}
