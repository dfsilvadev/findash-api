import { UpdateAccountController } from "../../http/controllers/accounts/update-account.controller.js";

import { makeUpdateAccountUseCase } from "../../../infrastructure/factories/accounts/make-update-account.use-case.js";

export function makeUpdateAccountController() {
  const updateAccountUseCase = makeUpdateAccountUseCase();
  return new UpdateAccountController(updateAccountUseCase);
}
