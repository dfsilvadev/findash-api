import type { TransactionType } from "../../../domain/entities/transaction.entity.js";

export interface CreateTransactionInput {
  accountId: string; // TODO: Use authentication context instead of passing accountId directly
  categoryId: string;
  title: string;
  description?: string;
  amount: number;
  type: TransactionType;
  date: Date;
}
