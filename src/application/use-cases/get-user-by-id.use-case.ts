import { UserDoesNotExistError } from "../../domain/errors/user-does-not-exist.error.js";

import type { PrismaUserRepository } from "../../infrastructure/persistence/prisma/repositories/prisma-user.repository.js";
import type { UserResponseDto } from "../dtos/get-user-by-id.dto.js";

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: PrismaUserRepository) {}

  async execute(userId: string): Promise<UserResponseDto> {
    const userExists = await this.userRepository.findById(userId);

    if (!userExists) throw new UserDoesNotExistError(userId);

    const userResponse = {
      id: userExists.id,
      firstName: userExists.firstName,
      lastName: userExists.lastName,
      email: userExists.email,
      status: userExists.status,
      createdAt: userExists.createdAt,
      updatedAt: userExists.updatedAt,
      deletedAt: userExists.deletedAt
    };

    return userResponse;
  }
}
