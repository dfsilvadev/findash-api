import { Router } from "express";

import { routerAdapter } from "../adapters/router.adapter.js";

import { makeCreateTransactionController } from "../../factories/transactions/make-create-transaction.controller.js";
import { makeListTransactionsByUserIdController } from "../../factories/transactions/make-list-transactions-by-user-id.controller.js";

export const transactionRouter: Router = Router();

/**
 * Route to list transactions by user ID
 */
transactionRouter.get(
  "/list",
  routerAdapter(makeListTransactionsByUserIdController())
);

/**
 * Route to create a new transaction
 */
transactionRouter.post("/", routerAdapter(makeCreateTransactionController()));
