import { prisma } from "../prisma.js";

import { TransactionDoesNotExistError } from "../../../../domain/errors/transaction-does-not-exist.error.js";
import { Prisma } from "../../../../generated/prisma/client.js";

import type { Transaction } from "../../../../domain/entities/transaction.entity.js";
import type {
  CreateTransactionData,
  ListTransactionsByAccountIdParams,
  TransactionOwnerKey,
  TransactionRepository,
  TransactionTotals,
  UpdateTransactionData
} from "../../../../domain/repositories/transaction.repository.js";
import type { Paginated } from "../../../../domain/shared/pagination.js";
import type { Transaction as TransactionRow } from "../../../../generated/prisma/client.js";

function toTransaction(row: TransactionRow): Transaction {
  return { ...row, amount: row.amount.toNumber() };
}

export class PrismaTransactionRepository implements TransactionRepository {
  async create(data: CreateTransactionData): Promise<Transaction> {
    const row = await prisma.transaction.create({ data });
    return toTransaction(row);
  }

  async listByAccountId({
    accountId,
    page,
    limit,
    order
  }: ListTransactionsByAccountIdParams): Promise<Paginated<Transaction>> {
    const where = { accountId };

    const [rows, total] = await prisma.$transaction([
      prisma.transaction.findMany({
        where,
        orderBy: [{ date: order }, { id: order }],
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.transaction.count({ where })
    ]);

    return { items: rows.map(toTransaction), total };
  }

  async update(
    { transactionId, accountId }: TransactionOwnerKey,
    data: UpdateTransactionData
  ): Promise<Transaction> {
    try {
      const row = await prisma.transaction.update({
        where: { id: transactionId, accountId },
        data
      });
      return toTransaction(row);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new TransactionDoesNotExistError(transactionId);
      }
      throw error;
    }
  }

  async findByIdAndAccountId({
    transactionId,
    accountId
  }: TransactionOwnerKey): Promise<Transaction | null> {
    const row = await prisma.transaction.findFirst({
      where: { id: transactionId, accountId }
    });
    return row ? toTransaction(row) : null;
  }

  async delete({
    transactionId,
    accountId
  }: TransactionOwnerKey): Promise<void> {
    const { count } = await prisma.transaction.deleteMany({
      where: { id: transactionId, accountId }
    });
    if (count === 0) throw new TransactionDoesNotExistError(transactionId);
  }

  async getTotalsByAccountId(accountId: string): Promise<TransactionTotals> {
    const groups = await prisma.transaction.groupBy({
      by: ["type"],
      where: { accountId },
      _sum: { amount: true }
    });

    const totals: TransactionTotals = {
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
