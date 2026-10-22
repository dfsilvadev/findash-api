import { prisma } from "../prisma.js";

import type {
  CreateTransactionInput,
  ListTransactionsByUserIdInput,
  PaginatedTransactions,
  TransactionResponse
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
}
