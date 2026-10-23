import { prisma } from "../prisma.js";

import { TransactionDoesNotExistError } from "../../../../domain/errors/transaction-does-not-exist.error.js";
import { Prisma } from "../../../../generated/prisma/client.js";

import type {
  CreateTransactionInput,
  ListTransactionsByUserIdInput,
  PaginatedTransactions,
  TransactionOwnerKey,
  TransactionResponse,
  UpdateTransactionInput
} from "../../../../domain/entities/transaction.entity.js";
import type { TransactionRepository } from "../../../../domain/repositories/transaction.repository.js";
import type { Transaction } from "../../../../generated/prisma/client.js";

function toTransactionResponse(row: Transaction): TransactionResponse {
  return { ...row, amount: row.amount.toNumber() };
}

export class PrismaTransactionRepository implements TransactionRepository {
  async create(input: CreateTransactionInput): Promise<TransactionResponse> {
    const row = await prisma.transaction.create({
      data: input
    });
    return toTransactionResponse(row);
  }

  async listByUserId({
    userId,
    page,
    limit,
    orderBy
  }: ListTransactionsByUserIdInput): Promise<PaginatedTransactions> {
    const where = { userId };

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
    { transactionId, userId }: TransactionOwnerKey,
    input: UpdateTransactionInput
  ): Promise<TransactionResponse> {
    try {
      const row = await prisma.transaction.update({
        where: { id: transactionId, userId },
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

  async findByIdAndUserId({
    transactionId,
    userId
  }: TransactionOwnerKey): Promise<TransactionResponse | null> {
    const row = await prisma.transaction.findFirst({
      where: { id: transactionId, userId }
    });
    return row ? toTransactionResponse(row) : null;
  }
}
