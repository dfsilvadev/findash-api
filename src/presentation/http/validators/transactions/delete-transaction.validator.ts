import { z } from "zod";

export const deleteTransactionValidator = z.object({
  transactionId: z.uuid(),
  userId: z.uuid()
});

export type DeleteTransactionDto = z.infer<typeof deleteTransactionValidator>;
