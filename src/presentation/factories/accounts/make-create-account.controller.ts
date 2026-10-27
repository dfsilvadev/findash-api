import { CreateAccountController } from "../../http/controllers/accounts/create-account.controller.js";

import { makeCreateAccountUseCase } from "../../../infrastructure/factories/accounts/make-create-account.use-case.js";

export function makeCreateAccountController() {
  const createAccountUseCase = makeCreateAccountUseCase();
  return new CreateAccountController(createAccountUseCase);
}
