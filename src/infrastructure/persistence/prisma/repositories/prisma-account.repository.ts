import { prisma } from "../prisma.js";

import { AccountStatus } from "../../../../domain/entities/account.entity.js";
import { SortOrder } from "../../../../domain/shared/sort-order.js";
import { accountWithoutCredentialsSelect } from "../utils/constants/account-select.js";

import type {
  Account,
  AccountWithoutCredentials,
  NonDeletedAccountStatus
} from "../../../../domain/entities/account.entity.js";
import type {
  AccountRepository,
  AccountTransactionTotals,
  CreateAccountData,
  ListAccountsParams,
  UpdateAccountData
} from "../../../../domain/repositories/account.repository.js";

export class PrismaAccountRepository implements AccountRepository {
  async create(data: CreateAccountData): Promise<AccountWithoutCredentials> {
    const row = await prisma.account.create({
      data,
      select: { ...accountWithoutCredentialsSelect }
    });

    return row;
  }

  async update(
    accountId: string,
    data: UpdateAccountData
  ): Promise<AccountWithoutCredentials> {
    const row = await prisma.account.update({
      where: { id: accountId },
      data,
      select: { ...accountWithoutCredentialsSelect }
    });

    return row;
  }

  async updateStatus(
    accountId: string,
    status: NonDeletedAccountStatus
  ): Promise<AccountWithoutCredentials> {
    const row = await prisma.account.update({
      where: { id: accountId },
      data: { status },
      select: { ...accountWithoutCredentialsSelect }
    });
    return row;
  }

  async delete(accountId: string): Promise<void> {
    await prisma.account.update({
      where: { id: accountId },
      data: { deletedAt: new Date(), status: AccountStatus.DELETED }
    });
  }

  async findByEmail(email: string): Promise<Account | null> {
    const row = await prisma.account.findFirst({
      where: { email, deletedAt: null }
    });
    return row;
  }

  async findById(accountId: string): Promise<AccountWithoutCredentials | null> {
    const row = await prisma.account.findFirst({
      where: { id: accountId, deletedAt: null },
      select: { ...accountWithoutCredentialsSelect }
    });
    return row;
  }

  async findAll({
    status,
    order = SortOrder.ASC
  }: ListAccountsParams): Promise<AccountWithoutCredentials[]> {
    const whereClause = status
      ? { status }
      : {
          deletedAt: null
        };

    const rows = await prisma.account.findMany({
      where: whereClause,
      select: { ...accountWithoutCredentialsSelect },
      orderBy: {
        createdAt: order
      }
    });

    return rows;
  }

  async getTotalsByType(accountId: string): Promise<AccountTransactionTotals> {
    const groups = await prisma.transaction.groupBy({
      by: ["type"],
      where: { accountId },
      _sum: { amount: true }
    });

    const totals: AccountTransactionTotals = {
      income: 0,
      expenses: 0,
      investments: 0
    };

    for (const group of groups) {
      const sum = group._sum.amount?.toNumber() ?? 0;
      if (group.type === "INCOME") totals.income = sum;
      if (group.type === "EXPENSE") totals.expenses = sum;
      if (group.type === "INVESTMENT") totals.investments = sum;
    }

    return totals;
  }
}
