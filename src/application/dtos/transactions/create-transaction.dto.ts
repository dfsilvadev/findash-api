export interface CreateTransactionDto {
  title: string;
  description?: string;
  amount: number;
  type: "INCOME" | "EXPENSE" | "INVESTMENT";
  date: Date;
  accountId: string;
  categoryId: string;
}
