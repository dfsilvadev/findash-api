import { Router } from "express";

import { routerAdapter } from "../adapters/router.adapter.js";

import { makeCreateTransactionController } from "../../factories/transactions/make-create-transaction.controller.js";
import { makeDeleteTransactionController } from "../../factories/transactions/make-delete-transaction.controller.js";
import { makeListTransactionsByAccountIdController } from "../../factories/transactions/make-list-transactions-by-account-id.controller.js";
import { makeUpdateTransactionController } from "../../factories/transactions/make-update-transaction.controller.js";

export const transactionRouter: Router = Router();

/**
 * Route to list transactions by account ID
 */
transactionRouter.get(
  "/list",
  routerAdapter(makeListTransactionsByAccountIdController())
);

/**
 * Route to create a new transaction
 */
transactionRouter.post("/", routerAdapter(makeCreateTransactionController()));

/**
 * Route to update an existing transaction
 */
transactionRouter.patch(
  "/:accountId/:transactionId",
  routerAdapter(makeUpdateTransactionController())
);

/**
 * Route to delete a transaction
 */
transactionRouter.delete("/", routerAdapter(makeDeleteTransactionController()));
