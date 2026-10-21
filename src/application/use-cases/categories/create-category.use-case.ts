import { UserDoesNotExistError } from "../../../domain/errors/user-does-not-exist.error.js";

import type { CategoryRepository } from "../../../domain/repositories/category.repository.js";
import type { UserRepository } from "../../../domain/repositories/user.repository.js";
import type { CreateCategoryInputDto } from "../../dtos/categories/create-category.dto.js";

export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(input: CreateCategoryInputDto): Promise<void> {
    const { userId } = input;

    const userExists = await this.userRepository.findById(userId);
    if (!userExists) throw new UserDoesNotExistError(userId);

    await this.categoryRepository.create(input);
  }
}
