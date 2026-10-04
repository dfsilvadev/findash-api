import type { UserSelect } from "../../../../../generated/prisma/models.js";

export const userWithoutCredentialsSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true
} satisfies UserSelect;
