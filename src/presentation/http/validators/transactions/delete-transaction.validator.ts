import { z } from "zod";

export const deleteTransactionSchema = z.object({
  transactionId: z.uuid(),
  accountId: z.uuid()
});

export type DeleteTransactionSchema = z.infer<typeof deleteTransactionSchema>;
