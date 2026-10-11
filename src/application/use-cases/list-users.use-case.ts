import type {
  ListUsersParams,
  UserResponse
} from "../../domain/entities/user.entity.js";
import type { PrismaUserRepository } from "../../infrastructure/persistence/prisma/repositories/prisma-user.repository.js";

export class ListUsersUseCase {
  constructor(private readonly userRepository: PrismaUserRepository) {}

  async execute(params: ListUsersParams): Promise<UserResponse[]> {
    const users = await this.userRepository.findAll(params);
    return users;
  }
}
