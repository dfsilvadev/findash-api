import type {
  CreateTransactionInput,
  ListTransactionsByUserIdInput,
  PaginatedTransactions,
  TransactionOwnerKey,
  TransactionResponse,
  UpdateTransactionInput
} from "../entities/transaction.entity.js";

export interface TransactionRepository {
  create(input: CreateTransactionInput): Promise<TransactionResponse>;
  listByUserId(
    input: ListTransactionsByUserIdInput
  ): Promise<PaginatedTransactions>;
  update(
    key: TransactionOwnerKey,
    input: UpdateTransactionInput
  ): Promise<TransactionResponse>;
  findByIdAndUserId(
    key: TransactionOwnerKey
  ): Promise<TransactionResponse | null>;
  delete(key: TransactionOwnerKey): Promise<void>;
}
