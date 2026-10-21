import { z } from "zod";

export const listTransactionsByUserIdQueryValidator = z.object({
  userId: z.uuid()
});

export type ListTransactionsByUserIdQuery = z.infer<
  typeof listTransactionsByUserIdQueryValidator
>;
