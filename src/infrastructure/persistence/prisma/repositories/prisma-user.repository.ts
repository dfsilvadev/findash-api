import { prisma } from "../prisma.js";

import {
  SortOrder,
  type CreateUserInput,
  type ListUsersParams,
  type UserResponse
} from "../../../../domain/entities/user.entity.js";
import { userWithoutCredentialsSelect } from "../utils/constants/user-select.js";

import type { UserRepository } from "../../../../domain/repositories/user.repository.js";
import type { User } from "../../../../generated/prisma/client.js";

export class PrismaUserRepository implements UserRepository {
  async findAll({
    status,
    order = SortOrder.ASC
  }: ListUsersParams): Promise<UserResponse[]> {
    const whereClause = status
      ? { status }
      : {
          deletedAt: null
        };

    const rows = await prisma.user.findMany({
      where: whereClause,
      select: { ...userWithoutCredentialsSelect },
      orderBy: {
        createdAt: order
      }
    });

    return rows;
  }

  async findById(id: string): Promise<UserResponse | null> {
    const row = await prisma.user.findUnique({
      where: { id },
      select: { ...userWithoutCredentialsSelect }
    });
    return row;
  }

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
