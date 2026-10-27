import { CreateCategoryUseCase } from "../../../application/use-cases/categories/create-category.use-case.js";

import { makeAccountRepository } from "../accounts/make-account.repository.js";
import { makeCategoryRepository } from "./make-category.repository.js";

export function makeCreateCategoryUseCase() {
  const categoryRepository = makeCategoryRepository();
  const accountRepository = makeAccountRepository();

  return new CreateCategoryUseCase(categoryRepository, accountRepository);
}
