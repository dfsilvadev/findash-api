import { z } from "zod";

import { AccountSortOrder } from "../../../../domain/entities/account.entity.js";
import { UserStatus } from "../../../../generated/prisma/client.js";

export const listAccountsValidator = z.object({
  status: z.enum(UserStatus).optional(),
  order: z.enum(AccountSortOrder).optional().default(AccountSortOrder.DESC)
});

export type ListAccountsValidator = z.infer<typeof listAccountsValidator>;
