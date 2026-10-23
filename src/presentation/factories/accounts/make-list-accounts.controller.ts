import { ListAccountsController } from "../../http/controllers/accounts/list-accounts.controller.js";

import { makeListAccountsUseCase } from "../../../infrastructure/factories/accounts/make-list-accounts.use-case.js";

export function makeListAccountsController() {
  const listAccountsUseCase = makeListAccountsUseCase();
  return new ListAccountsController(listAccountsUseCase);
}
