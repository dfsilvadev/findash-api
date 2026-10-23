export interface UpdateTransactionDto {
  accountId: string; // TODO: Use authentication context instead of passing accountId directly
  transactionId: string;
  title?: string;
  description?: string | null;
  amount?: number;
  type?: "INCOME" | "EXPENSE" | "INVESTMENT";
  date?: Date;
  categoryId?: string;
}
