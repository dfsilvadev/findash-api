import { Router } from "express";

import { routerAdapter } from "../adapters/router.adapter.js";

import { makeCreateCategoryController } from "../../factories/categories/make-create-category.controller.js";

export const categoryRouter: Router = Router();

/**
 * Routes for category-related queries
 */
categoryRouter.post("/", routerAdapter(makeCreateCategoryController()));
