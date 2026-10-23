import { GetAccountByIdController } from "../../http/controllers/accounts/get-account-by-id.controller.js";

import { makeGetAccountByIdUseCase } from "../../../infrastructure/factories/accounts/make-get-account.use-case.js";

export function makeGetAccountByIdController() {
  const getAccountByIdUseCase = makeGetAccountByIdUseCase();
  return new GetAccountByIdController(getAccountByIdUseCase);
}
