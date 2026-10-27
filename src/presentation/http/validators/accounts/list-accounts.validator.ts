import { z } from "zod";

import { AccountStatus } from "../../../../domain/entities/account.entity.js";
import { SortOrder } from "../../../../domain/shared/sort-order.js";

export const listAccountsValidator = z.object({
  status: z.enum(AccountStatus).optional(),
  order: z.enum(SortOrder).optional().default(SortOrder.DESC)
});

export type ListAccountsValidator = z.infer<typeof listAccountsValidator>;
