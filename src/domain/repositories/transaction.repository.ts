import type {
  CreateTransactionInput,
  TransactionResponse
} from "../entities/transaction.entity.js";

export interface TransactionRepository {
  create(input: CreateTransactionInput): Promise<TransactionResponse>;
}
