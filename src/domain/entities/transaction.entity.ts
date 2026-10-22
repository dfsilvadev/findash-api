export type TransactionResponse = {
  id: string;
  title: string;
  description: string | null;
  amount: number;
  type: TransactionType;
  date: Date;
  userId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TransactionType = "INCOME" | "EXPENSE" | "INVESTMENT";

export interface CreateTransactionInput {
  title: string;
  description?: string;
  amount: number;
  type: TransactionType;
  date: Date;
  userId: string;
  categoryId: string;
}
