import { prisma } from "../prisma.js";

import type {
  CreateTransactionInput,
  TransactionResponse
} from "../../../../domain/entities/transaction.entity.js";
import type { TransactionRepository } from "../../../../domain/repositories/transaction.repository.js";

export class PrismaTransactionRepository implements TransactionRepository {
  async create(input: CreateTransactionInput): Promise<TransactionResponse> {
    const row = await prisma.transaction.create({
      data: input
    });
    return row;
  }
}
