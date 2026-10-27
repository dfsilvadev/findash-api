import { z } from "zod";

export const getAccountByIdSchema = z.object({
  accountId: z.uuid()
});

export type GetAccountByIdSchema = z.infer<typeof getAccountByIdSchema>;
