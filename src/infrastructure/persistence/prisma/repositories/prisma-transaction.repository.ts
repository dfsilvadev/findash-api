import { prisma } from "../prisma.js";

import type {
  CreateTransactionInput,
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

  async listByUserId(userId: string): Promise<TransactionResponse[]> {
    const rows = await prisma.transaction.findMany({
      where: {
        userId: userId
      }
    });
    return rows.map(toTransactionResponse);
  }
}
