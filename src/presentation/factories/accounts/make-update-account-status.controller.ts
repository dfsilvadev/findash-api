import { UpdateAccountStatusController } from "../../http/controllers/accounts/update-account-status.controller.js";

import { makeUpdateAccountStatusUseCase } from "../../../infrastructure/factories/accounts/make-update-account-status.use-case.js";

export function makeUpdateAccountStatusController() {
  const updateAccountStatusUseCase = makeUpdateAccountStatusUseCase();
  return new UpdateAccountStatusController(updateAccountStatusUseCase);
}
