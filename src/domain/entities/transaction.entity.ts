export type TransactionResponse = {
  id: string;
  title: string;
  description: string | null;
  amount: number;
  type: TransactionType;
  date: Date;
  accountId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TransactionType = "INCOME" | "EXPENSE" | "INVESTMENT";

export type SortOrder = "asc" | "desc";

export interface ListTransactionsByAccountIdInput {
  accountId: string;
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
  accountId: string;
  categoryId: string;
}

export interface TransactionOwnerKey {
  transactionId: string;
  accountId: string;
}

export type UpdateTransactionInput = Partial<
  Omit<CreateTransactionInput, "accountId" | "description">
> & {
  description?: string | null;
};
