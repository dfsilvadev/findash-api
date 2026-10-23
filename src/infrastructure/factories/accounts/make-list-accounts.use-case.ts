import { ListAccountsUseCase } from "../../../application/use-cases/accounts/list-accounts.use-case.js";

import { PrismaAccountRepository } from "../../persistence/prisma/repositories/prisma-account.repository.js";

export function makeListAccountsUseCase() {
  const accountRepository = new PrismaAccountRepository();
  return new ListAccountsUseCase(accountRepository);
}
