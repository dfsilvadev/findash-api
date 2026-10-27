import { z } from "zod";

import { createTransactionSchema } from "./create-transaction.validator.js";

export const updateTransactionSchema = createTransactionSchema
  .omit({ accountId: true })
  .partial()
  .extend({
    description: createTransactionSchema.shape.description.nullable()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided"
  });

export const updateTransactionParamsSchema = z.object({
  transactionId: z.uuid(),
  accountId: z.uuid() // TODO: Use authentication context instead of passing accountId directly
});

export type UpdateTransactionSchema = z.infer<typeof updateTransactionSchema>;
export type UpdateTransactionParamsSchema = z.infer<
  typeof updateTransactionParamsSchema
>;
