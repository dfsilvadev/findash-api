import { z } from "zod";

import { AccountStatus } from "../../../../domain/entities/account.entity.js";

export const updateAccountStatusBodySchema = z.object({
  status: z.enum([AccountStatus.ACTIVE, AccountStatus.SUSPENDED])
});

export const updateAccountStatusParamsSchema = z.object({
  accountId: z.uuid("Invalid account ID")
});

export type UpdateAccountStatusParams = z.infer<
  typeof updateAccountStatusParamsSchema
>;
export type UpdateAccountStatusBody = z.infer<
  typeof updateAccountStatusBodySchema
>;
