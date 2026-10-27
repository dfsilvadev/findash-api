import { Router } from "express";

import { routerAdapter } from "../adapters/router.adapter.js";

import { makeCreateTransactionController } from "../../factories/transactions/make-create-transaction.controller.js";
import { makeDeleteTransactionController } from "../../factories/transactions/make-delete-transaction.controller.js";
import { makeListTransactionsByAccountIdController } from "../../factories/transactions/make-list-transactions-by-account-id.controller.js";
import { makeUpdateTransactionController } from "../../factories/transactions/make-update-transaction.controller.js";

export const transactionRouter: Router = Router();

/**
 * Routes for transaction-related queries
 */
transactionRouter.get(
  "/list",
  routerAdapter(makeListTransactionsByAccountIdController())
);

/**
 * Routes for transaction-related creation and updates
 */
transactionRouter.post("/", routerAdapter(makeCreateTransactionController()));
transactionRouter.patch(
  "/:accountId/:transactionId",
  routerAdapter(makeUpdateTransactionController())
);

/**
 * Routes for transaction-related deletions
 */
transactionRouter.delete("/", routerAdapter(makeDeleteTransactionController()));
