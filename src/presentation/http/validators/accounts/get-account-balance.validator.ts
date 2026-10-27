import { z } from "zod";

export const getAccountBalanceSchema = z.object({
  accountId: z.uuid()
});

export type GetAccountBalanceSchema = z.infer<typeof getAccountBalanceSchema>;
