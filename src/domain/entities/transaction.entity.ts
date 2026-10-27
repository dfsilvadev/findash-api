import type { FinancialType } from "../shared/financial-type.js";

export type TransactionType = FinancialType;

export interface Transaction {
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
}
