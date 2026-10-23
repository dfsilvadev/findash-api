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

export type SortOrder = "asc" | "desc";

export interface ListTransactionsByUserIdInput {
  userId: string;
  page: number;
  limit: number;
  orderBy: SortOrder;
}

export interface PaginatedTransactions {
  items: TransactionResponse[];
  total: number;
}

export interface CreateTransactionInput {
  title: string;
  description?: string;
  amount: number;
  type: TransactionType;
  date: Date;
  userId: string;
  categoryId: string;
}

export interface TransactionOwnerKey {
  transactionId: string;
  userId: string;
}

export type UpdateTransactionInput = Partial<
  Omit<CreateTransactionInput, "userId" | "description">
> & {
  description?: string | null;
};
