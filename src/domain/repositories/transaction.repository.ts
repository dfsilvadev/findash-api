import type {
  CreateTransactionInput,
  ListTransactionsByUserIdInput,
  PaginatedTransactions,
  TransactionResponse
} from "../entities/transaction.entity.js";

export interface TransactionRepository {
  create(input: CreateTransactionInput): Promise<TransactionResponse>;
  listByUserId(
    input: ListTransactionsByUserIdInput
  ): Promise<PaginatedTransactions>;
}
