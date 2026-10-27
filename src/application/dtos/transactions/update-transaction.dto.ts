import type { TransactionType } from "../../../domain/entities/transaction.entity.js";

export interface UpdateTransactionInput {
  accountId: string; // TODO: Use authentication context instead of passing accountId directly
  transactionId: string;
  title?: string;
  description?: string | null;
  amount?: number;
  type?: TransactionType;
  date?: Date;
  categoryId?: string;
}
