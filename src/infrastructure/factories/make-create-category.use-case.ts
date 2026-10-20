import { CreateCategoryUseCase } from "../../application/use-cases/categories/create-category.use-case.js";

import { makeCategoryRepository } from "./make-category.repository.js";
import { makeUserRepository } from "./make-user.repository.js";

export function makeCreateCategoryUseCase() {
  const categoryRepository = makeCategoryRepository();
  const userRepository = makeUserRepository();

  return new CreateCategoryUseCase(categoryRepository, userRepository);
}
