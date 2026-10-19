import { CreateTransactionController } from "../http/controllers/transactions/create-transaction.controller.js";

import { makeCreateTransactionUseCase } from "../../infrastructure/factories/make-create-transaction.use-case.js";

export function makeCreateTransactionController() {
  const createTransactionUseCase = makeCreateTransactionUseCase();
  return new CreateTransactionController(createTransactionUseCase);
}
