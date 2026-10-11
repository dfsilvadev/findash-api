import { Router } from "express";

import { routerAdapter } from "../adapters/router.adapter.js";

import { makeCreateUserController } from "../../factories/make-create-user.controller.js";
import { makeDeleteUserController } from "../../factories/make-delete-user.controller.js";
import { makeGetUserByIdController } from "../../factories/make-get-user.controller.js";
import { makeListUsersController } from "../../factories/make-list-users.controller.js";
import { makeUpdateUserStatusController } from "../../factories/make-update-user-status.controller.js";
import { makeUpdateUserController } from "../../factories/make-update-user.controller.js";

export const userRouter: Router = Router();

/**
 * Routes for user-related operations
 */
userRouter.get("/", routerAdapter(makeListUsersController()));
userRouter.get("/:userId", routerAdapter(makeGetUserByIdController()));

/**
 * Route for creating a new user
 */
userRouter.post("/", routerAdapter(makeCreateUserController()));

/**
 * Route for updating a user
 * Route for updating a user's status
 */
userRouter.patch("/:userId", routerAdapter(makeUpdateUserController()));
userRouter.patch(
  "/:userId/status",
  routerAdapter(makeUpdateUserStatusController())
);

/**
 * Route for deleting a user
 */
userRouter.delete("/:userId", routerAdapter(makeDeleteUserController()));
