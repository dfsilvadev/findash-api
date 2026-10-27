import { ListTransactionsByAccountIdController } from "../../http/controllers/transactions/list-transactions-by-account-id.controller.js";

import { makeListTransactionsByAccountIdUseCase } from "../../../infrastructure/factories/transactions/make-list-transactions-by-account-id.use-case.js";

export function makeListTransactionsByAccountIdController() {
  const listTransactionsByAccountIdUseCase =
    makeListTransactionsByAccountIdUseCase();
  return new ListTransactionsByAccountIdController(
    listTransactionsByAccountIdUseCase
  );
}
