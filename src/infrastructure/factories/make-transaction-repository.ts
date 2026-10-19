import { PrismaTransactionRepository } from "../persistence/prisma/repositories/prisma-transaction.repository.js";

export const makeTransactionRepository = () => {
  return new PrismaTransactionRepository();
};
