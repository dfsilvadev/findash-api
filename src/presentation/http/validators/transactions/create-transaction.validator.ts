import { z } from "zod";

const MAX_AMOUNT = 99_999_999.99;

export const createTransactionValidator = z.object({
  title: z.string(),
  description: z.string().optional(),
  amount: z.number().positive().multipleOf(0.01).max(MAX_AMOUNT),
  type: z.enum(["INCOME", "EXPENSE", "INVESTMENT"]),
  date: z.coerce.date(),
  userId: z.uuid(),
  categoryId: z.uuid()
});

export type CreateTransactionValidator = z.infer<
  typeof createTransactionValidator
>;
