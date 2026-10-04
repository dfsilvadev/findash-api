import { Router } from "express";

import { routerAdapter } from "../adapters/router.adapter.js";

import { makeCreateUserController } from "../../factories/make-create-user-controller.js";
import { makeGetUserByIdController } from "../../factories/make-get-user-controller.js";
import { makeListUsersController } from "../../factories/make-list-users-controller.js";

export const userRouter: Router = Router();

userRouter.post("/", routerAdapter(makeCreateUserController()));
userRouter.get("/:userId", routerAdapter(makeGetUserByIdController()));
userRouter.get("/", routerAdapter(makeListUsersController()));
