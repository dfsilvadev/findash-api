import { GetAccountBalanceController } from "../../http/controllers/accounts/get-account-balance.controller.js";

import { makeGetAccountBalanceUseCase } from "../../../infrastructure/factories/accounts/make-get-account-balance.use-case.js";

export function makeGetAccountBalanceController() {
  const getAccountBalanceUseCase = makeGetAccountBalanceUseCase();
  return new GetAccountBalanceController(getAccountBalanceUseCase);
}
