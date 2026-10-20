import { Router } from "express";

import { routerAdapter } from "../adapters/router.adapter.js";

import { makeCreateTransactionController } from "../../factories/transactions/make-create-transaction.controller.js";

export const transactionRouter: Router = Router();

/**
 * Route to create a new transaction
 */
transactionRouter.post("/", routerAdapter(makeCreateTransactionController()));
