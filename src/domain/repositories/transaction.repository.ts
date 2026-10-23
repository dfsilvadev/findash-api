import type {
  CreateTransactionInput,
  ListTransactionsByAccountIdInput,
  PaginatedTransactions,
  TransactionOwnerKey,
  TransactionResponse,
  UpdateTransactionInput
} from "../entities/transaction.entity.js";

export interface TransactionRepository {
  create(input: CreateTransactionInput): Promise<TransactionResponse>;
  listByAccountId(
    input: ListTransactionsByAccountIdInput
  ): Promise<PaginatedTransactions>;
  update(
    key: TransactionOwnerKey,
    input: UpdateTransactionInput
  ): Promise<TransactionResponse>;
  findByIdAndAccountId(
    key: TransactionOwnerKey
  ): Promise<TransactionResponse | null>;
  delete(key: TransactionOwnerKey): Promise<void>;
}
