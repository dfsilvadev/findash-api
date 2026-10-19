import { z } from "zod";

export const createTransactionValidator = z.object({
  title: z.string(),
  description: z.string().optional(),
  amount: z.coerce.number().positive(),
  type: z.enum(["INCOME", "EXPENSE", "INVESTMENT"]),
  date: z.date(),
  userId: z.uuid(),
  categoryId: z.uuid()
});

export type CreateTransactionValidator = z.infer<
  typeof createTransactionValidator
>;
