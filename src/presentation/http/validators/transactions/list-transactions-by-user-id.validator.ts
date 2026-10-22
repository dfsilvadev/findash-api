import { z } from "zod";

export const listTransactionsByUserIdQueryParamsValidator = z.object({
  userId: z.uuid(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  orderBy: z.enum(["asc", "desc"]).default("asc")
});

export type ListTransactionsByUserIdQuery = z.infer<
  typeof listTransactionsByUserIdQueryParamsValidator
>;
