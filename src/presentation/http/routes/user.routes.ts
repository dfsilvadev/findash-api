import { Router } from "express";

import { routerAdapter } from "../adapters/router.adapter.js";

import { makeCreateUserController } from "../../factories/make-create-user-controller.js";
import { makeGetUserByIdController } from "../../factories/make-get-user-controller.js";
import { makeListUsersController } from "../../factories/make-list-users-controller.js";
import { makeUpdateUserController } from "../../factories/make-update-user-controller.js";

export const userRouter: Router = Router();

userRouter.get("/", routerAdapter(makeListUsersController()));
userRouter.get("/:userId", routerAdapter(makeGetUserByIdController()));
userRouter.post("/", routerAdapter(makeCreateUserController()));
userRouter.patch("/:userId", routerAdapter(makeUpdateUserController()));
