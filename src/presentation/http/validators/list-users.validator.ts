import { z } from "zod";

import { UserStatus } from "../../../generated/prisma/enums.js";
import { SortOrder } from "../../../generated/prisma/internal/prismaNamespace.js";

export const listUsersValidator = z.object({
  status: z.enum(UserStatus).optional(),
  order: z.enum(SortOrder).optional().default(SortOrder.desc)
});

export type ListUsersValidator = z.infer<typeof listUsersValidator>;
