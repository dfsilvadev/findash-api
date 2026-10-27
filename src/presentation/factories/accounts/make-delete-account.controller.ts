import { DeleteAccountController } from "../../http/controllers/accounts/delete-account.controller.js";

import { makeDeleteAccountUseCase } from "../../../infrastructure/factories/accounts/make-delete-account.use-case.js";

export function makeDeleteAccountController() {
  const deleteAccountUseCase = makeDeleteAccountUseCase();
  return new DeleteAccountController(deleteAccountUseCase);
}
