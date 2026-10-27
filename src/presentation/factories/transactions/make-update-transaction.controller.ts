import { UpdateTransactionController } from "../../http/controllers/transactions/update-transaction.controller.js";

import { makeUpdateTransactionUseCase } from "../../../infrastructure/factories/transactions/make-update-transaction.use-case.js";

export function makeUpdateTransactionController() {
  const updateTransactionUseCase = makeUpdateTransactionUseCase();

  return new UpdateTransactionController(updateTransactionUseCase);
}
