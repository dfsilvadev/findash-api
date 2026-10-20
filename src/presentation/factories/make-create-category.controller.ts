import { CreateCategoryController } from "../http/controllers/categories/create-category.controller.js";

import { makeCreateCategoryUseCase } from "../../infrastructure/factories/make-create-category.use-case.js";

export function makeCreateCategoryController() {
  const createCategoryUseCase = makeCreateCategoryUseCase();
  return new CreateCategoryController(createCategoryUseCase);
}
