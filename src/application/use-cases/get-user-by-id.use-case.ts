import { UserDoesNotExistError } from "../../domain/errors/user-does-not-exist.error.js";

import type { PrismaUserRepository } from "../../infrastructure/persistence/prisma/repositories/prisma-user.repository.js";
import type { UserResponseDto } from "../dtos/get-user-by-id.dto.js";

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: PrismaUserRepository) {}

  async execute(userId: string): Promise<UserResponseDto> {
    const foundUser = await this.userRepository.findById(userId);

    if (!foundUser) throw new UserDoesNotExistError(userId);

    return foundUser;
  }
}
