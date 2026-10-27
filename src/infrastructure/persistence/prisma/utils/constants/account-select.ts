import type { AccountSelect } from "../../../../../generated/prisma/models.js";

export const accountWithoutCredentialsSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true
} satisfies AccountSelect;
