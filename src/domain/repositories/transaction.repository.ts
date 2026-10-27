import type {
  Transaction,
  TransactionType
} from "../entities/transaction.entity.js";
import type { Paginated } from "../shared/pagination.js";
import type { SortOrder } from "../shared/sort-order.js";

export interface CreateTransactionData {
  title: string;
  description?: string;
  amount: number;
  type: TransactionType;
  date: Date;
  accountId: string;
  categoryId: string;
}

export type UpdateTransactionData = Partial<
  Omit<CreateTransactionData, "accountId" | "description">
> & {
  description?: string | null;
};

export interface TransactionOwnerKey {
  transactionId: string;
  accountId: string;
}

export interface ListTransactionsByAccountIdParams {
  accountId: string;
  page: number;
  limit: number;
  order: SortOrder;
}

export interface TransactionRepository {
  create(data: CreateTransactionData): Promise<Transaction>;
  listByAccountId(
    params: ListTransactionsByAccountIdParams
  ): Promise<Paginated<Transaction>>;
  update(
    key: TransactionOwnerKey,
    data: UpdateTransactionData
  ): Promise<Transaction>;
  findByIdAndAccountId(key: TransactionOwnerKey): Promise<Transaction | null>;
  delete(key: TransactionOwnerKey): Promise<void>;
}
