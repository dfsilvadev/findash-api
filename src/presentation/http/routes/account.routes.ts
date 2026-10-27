import { Router } from "express";

import { routerAdapter } from "../adapters/router.adapter.js";

import { makeCreateAccountController } from "../../factories/accounts/make-create-account.controller.js";
import { makeDeleteAccountController } from "../../factories/accounts/make-delete-account.controller.js";
import { makeGetAccountBalanceController } from "../../factories/accounts/make-get-account-balance.controller.js";
import { makeGetAccountByIdController } from "../../factories/accounts/make-get-account.controller.js";
import { makeListAccountsController } from "../../factories/accounts/make-list-accounts.controller.js";
import { makeUpdateAccountStatusController } from "../../factories/accounts/make-update-account-status.controller.js";
import { makeUpdateAccountController } from "../../factories/accounts/make-update-account.controller.js";

export const accountRouter: Router = Router();

/**
 * Routes for account-related queries
 */
accountRouter.get("/list", routerAdapter(makeListAccountsController()));
accountRouter.get("/:accountId", routerAdapter(makeGetAccountByIdController()));
accountRouter.get(
  "/:accountId/balance",
  routerAdapter(makeGetAccountBalanceController())
);

/**
 * Routes for account-related creation and updates
 */
accountRouter.post("/", routerAdapter(makeCreateAccountController()));
accountRouter.patch(
  "/:accountId",
  routerAdapter(makeUpdateAccountController())
);
accountRouter.patch(
  "/:accountId/status",
  routerAdapter(makeUpdateAccountStatusController())
);

/**
 * Route for account-related deletion
 */
accountRouter.delete(
  "/:accountId",
  routerAdapter(makeDeleteAccountController())
);
