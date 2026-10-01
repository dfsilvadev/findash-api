import type { User } from "../../../../domain/entities/user.entity.js";
import type {
  CreateUserInput,
  UserRepository
} from "../../../../domain/repositories/user.repository.js";
import { prisma } from "../prisma.js";

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const row = await prisma.user.findUnique({ where: { email } });
    return row;
  }

  async create(input: CreateUserInput): Promise<User> {
    const { password, ...rest } = input;
    const row = await prisma.user.create({
      data: { ...rest, passwordHash: password }
    });

    return row;
  }
}
