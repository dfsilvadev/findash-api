import { prisma } from "../prisma.js";

import {
  AccountSortOrder,
  type AccountResponse,
  type CreateAccountBodyInput,
  type ListAccountsParams,
  type NonDeletedAccountStatus,
  type UpdateAccountBodyInput
} from "../../../../domain/entities/account.entity.js";
import { accountWithoutCredentialsSelect } from "../utils/constants/account-select.js";

import type { AccountRepository } from "../../../../domain/repositories/account.repository.js";

export class PrismaAccountRepository implements AccountRepository {
  async create(input: CreateAccountBodyInput): Promise<AccountResponse> {
    const { password, ...rest } = input;
    const row = await prisma.user.create({
      data: { ...rest, passwordHash: password }
    });

    return row;
  }

  async update(
    id: string,
    input: Partial<UpdateAccountBodyInput>
  ): Promise<AccountResponse> {
    const row = await prisma.user.update({
      where: { id },
      data: input,
      select: { ...accountWithoutCredentialsSelect }
    });

    return row;
  }

  async updateStatus(
    id: string,
    status: NonDeletedAccountStatus
  ): Promise<AccountResponse> {
    const row = await prisma.user.update({
      where: { id },
      data: { status },
      select: { ...accountWithoutCredentialsSelect }
    });
    return row;
  }

  async delete(accountId: string): Promise<void> {
    await prisma.user.update({
      where: { id: accountId },
      data: { deletedAt: new Date(), status: "DELETED" }
    });
  }

  async findByEmail(email: string): Promise<AccountResponse | null> {
    const row = await prisma.user.findFirst({
      where: { email, deletedAt: null }
    });
    return row;
  }

  async findById(id: string): Promise<AccountResponse | null> {
    const row = await prisma.user.findFirst({
      where: { id, deletedAt: null },
      select: { ...accountWithoutCredentialsSelect }
    });
    return row;
  }

  async findAll({
    status,
    order = AccountSortOrder.ASC
  }: ListAccountsParams): Promise<AccountResponse[]> {
    const whereClause = status
      ? { status }
      : {
          deletedAt: null
        };

    const rows = await prisma.user.findMany({
      where: whereClause,
      select: { ...accountWithoutCredentialsSelect },
      orderBy: {
        createdAt: order
      }
    });

    return rows;
  }
}
