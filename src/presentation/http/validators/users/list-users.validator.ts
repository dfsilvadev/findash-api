import { z } from "zod";

import { SortOrder } from "../../../../domain/entities/user.entity.js";
import { UserStatus } from "../../../../generated/prisma/client.js";

export const listUsersValidator = z.object({
  status: z.enum(UserStatus).optional(),
  order: z.enum(SortOrder).optional().default(SortOrder.DESC)
});

export type ListUsersValidator = z.infer<typeof listUsersValidator>;
