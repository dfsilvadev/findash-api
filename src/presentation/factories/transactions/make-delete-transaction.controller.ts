import { DeleteTransactionController } from "../../http/controllers/transactions/delete-transaction.controller.js";

import { makeDeleteTransactionUseCase } from "../../../infrastructure/factories/transactions/make-delete-transaction.use-case.js";

export function makeDeleteTransactionController() {
  const deleteTransactionUseCase = makeDeleteTransactionUseCase();
  return new DeleteTransactionController(deleteTransactionUseCase);
}
