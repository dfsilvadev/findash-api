import { prisma } from "../prisma.js";

import { TransactionDoesNotExistError } from "../../../../domain/errors/transaction-does-not-exist.error.js";
import { Prisma } from "../../../../generated/prisma/client.js";

import type {
  CreateTransactionInput,
  ListTransactionsByAccountIdInput,
  PaginatedTransactions,
  TransactionOwnerKey,
  TransactionResponse,
  UpdateTransactionInput
} from "../../../../domain/entities/transaction.entity.js";
import type { TransactionRepository } from "../../../../domain/repositories/transaction.repository.js";
import type { Transaction } from "../../../../generated/prisma/client.js";

// The database column is still user_id (Prisma field userId); the domain calls it accountId
function toTransactionResponse({
  userId,
  ...row
}: Transaction): TransactionResponse {
  return { ...row, accountId: userId, amount: row.amount.toNumber() };
}

export class PrismaTransactionRepository implements TransactionRepository {
  async create({
    accountId,
    ...input
  }: CreateTransactionInput): Promise<TransactionResponse> {
    const row = await prisma.transaction.create({
      data: { ...input, userId: accountId }
    });
    return toTransactionResponse(row);
  }

  async listByAccountId({
    accountId,
    page,
    limit,
    orderBy
  }: ListTransactionsByAccountIdInput): Promise<PaginatedTransactions> {
    const where = { userId: accountId };

    const [rows, total] = await prisma.$transaction([
      prisma.transaction.findMany({
        where,
        orderBy: [{ date: orderBy }, { id: orderBy }],
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.transaction.count({ where })
    ]);

    return { items: rows.map(toTransactionResponse), total };
  }

  async update(
    { transactionId, accountId }: TransactionOwnerKey,
    input: UpdateTransactionInput
  ): Promise<TransactionResponse> {
    try {
      const row = await prisma.transaction.update({
        where: { id: transactionId, userId: accountId },
        data: input
      });
      return toTransactionResponse(row);
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
  }: TransactionOwnerKey): Promise<TransactionResponse | null> {
    const row = await prisma.transaction.findFirst({
      where: { id: transactionId, userId: accountId }
    });
    return row ? toTransactionResponse(row) : null;
  }

  async delete({
    transactionId,
    accountId
  }: TransactionOwnerKey): Promise<void> {
    const { count } = await prisma.transaction.deleteMany({
      where: { id: transactionId, userId: accountId }
    });
    if (count === 0) throw new TransactionDoesNotExistError(transactionId);
  }
}
