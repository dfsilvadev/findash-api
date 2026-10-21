import { ListTransactionsByUserIdController } from "../../http/controllers/transactions/list-transactions-by-user-id.controller.js";

import { makeListTransactionsByUserIdUseCase } from "../../../infrastructure/factories/transactions/make-list-transactions-by-user-id.use-case.js";

export function makeListTransactionsByUserIdController() {
  const listTransactionsByUserIdUseCase = makeListTransactionsByUserIdUseCase();
  return new ListTransactionsByUserIdController(
    listTransactionsByUserIdUseCase
  );
}
