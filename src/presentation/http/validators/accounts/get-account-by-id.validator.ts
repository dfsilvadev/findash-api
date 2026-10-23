import { z } from "zod";

export const getAccountByIdValidator = z.object({
  accountId: z.uuid()
});

export type GetAccountByIdValidator = z.infer<typeof getAccountByIdValidator>;
