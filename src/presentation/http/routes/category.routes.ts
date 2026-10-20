import { Router } from "express";

import { routerAdapter } from "../adapters/router.adapter.js";

import { makeCreateCategoryController } from "../../factories/make-create-category.controller.js";

export const categoryRouter: Router = Router();

/**
 * Create a new category
 */
categoryRouter.post("/", routerAdapter(makeCreateCategoryController()));
