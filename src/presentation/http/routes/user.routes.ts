import { Router } from "express";

import { routerAdapter } from "../adapters/router.adapter.js";

import { makeCreateUserController } from "../../factories/make-create-user-controller.js";

export const userRouter: Router = Router();

userRouter.post("/", routerAdapter(makeCreateUserController()));
