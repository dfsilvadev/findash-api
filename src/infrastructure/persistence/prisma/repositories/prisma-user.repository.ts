import type { User } from "../../../../domain/entities/user.entity.js";
import type {
  CreateUserInput,
  UserRepository
} from "../../../../domain/repositories/user.repository.js";
import { prisma } from "../prisma.js";

export class PrismaUserRepository implements UserRepository {
  async create(input: CreateUserInput): Promise<User> {
    const createdUser = await prisma.user.create({ data: input });

    return createdUser;
  }
}
