import { CreateCategoryUseCase } from "../../../application/use-cases/categories/create-category.use-case.js";

import { makeUserRepository } from "../users/make-user.repository.js";
import { makeCategoryRepository } from "./make-category.repository.js";

export function makeCreateCategoryUseCase() {
  const categoryRepository = makeCategoryRepository();
  const userRepository = makeUserRepository();

  return new CreateCategoryUseCase(categoryRepository, userRepository);
}
