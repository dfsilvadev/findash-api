import { z } from "zod";

import { createTransactionValidator } from "./create-transaction.validator.js";

export const updateTransactionValidator = createTransactionValidator
  .omit({ accountId: true })
  .partial()
  .extend({
    description: createTransactionValidator.shape.description.nullable()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided"
  });

export const updateTransactionParamsValidator = z.object({
  transactionId: z.uuid(),
  accountId: z.uuid() // TODO: Use authentication context instead of passing accountId directly
});

export type UpdateTransactionValidator = z.infer<
  typeof updateTransactionValidator
>;
export type UpdateTransactionParamsValidator = z.infer<
  typeof updateTransactionParamsValidator
>;
