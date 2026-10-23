export interface UpdateTransactionDto {
  userId: string; // TODO: Use authentication context instead of passing userId directly
  transactionId: string;
  title?: string;
  description?: string | null;
  amount?: number;
  type?: "INCOME" | "EXPENSE" | "INVESTMENT";
  date?: Date;
  categoryId?: string;
}
