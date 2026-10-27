import { z } from "zod";

import { FinancialType } from "../../../../domain/shared/financial-type.js";

const MAX_AMOUNT = 99_999_999.99;

const transactionDate = z
  .union([z.iso.date(), z.iso.datetime({ offset: true })])
  .transform((value) => new Date(value));

export const createTransactionSchema = z.object({
  title: z.string().trim().min(1).max(150),
  description: z.string().trim().max(255).optional(),
  amount: z.number().positive().multipleOf(0.01).max(MAX_AMOUNT),
  type: z.enum(FinancialType),
  date: transactionDate,
  accountId: z.uuid(),
  categoryId: z.uuid()
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;
