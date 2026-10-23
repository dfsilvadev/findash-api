import { Router } from "express";

import { routerAdapter } from "../adapters/router.adapter.js";

import { makeCreateTransactionController } from "../../factories/transactions/make-create-transaction.controller.js";
import { makeDeleteTransactionController } from "../../factories/transactions/make-delete-transaction.controller.js";
import { makeListTransactionsByUserIdController } from "../../factories/transactions/make-list-transactions-by-user-id.controller.js";
import { makeUpdateTransactionController } from "../../factories/transactions/make-update-transaction.controller.js";

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

/**
 * Route to update an existing transaction
 */
transactionRouter.patch(
  "/:userId/:transactionId",
  routerAdapter(makeUpdateTransactionController())
);

/**
 * Route to delete a transaction
 */
transactionRouter.delete("/", routerAdapter(makeDeleteTransactionController()));
