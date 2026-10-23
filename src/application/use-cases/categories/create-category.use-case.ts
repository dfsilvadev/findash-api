import { AccountDoesNotExistError } from "../../../domain/errors/account-does-not-exist.error.js";

import type { AccountRepository } from "../../../domain/repositories/account.repository.js";
import type { CategoryRepository } from "../../../domain/repositories/category.repository.js";
import type { CreateCategoryInputDto } from "../../dtos/categories/create-category.dto.js";

export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly accountRepository: AccountRepository
  ) {}

  async execute(input: CreateCategoryInputDto): Promise<void> {
    const { accountId } = input;

    const accountExists = await this.accountRepository.findById(accountId);
    if (!accountExists) throw new AccountDoesNotExistError(accountId);

    await this.categoryRepository.create(input);
  }
}
