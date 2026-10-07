import type { User, UserStatus } from "../../generated/prisma/client.js";

export interface CreateUserInput {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export type UpdateUserInput = Partial<Omit<CreateUserInput, "password">>;

export type UserResponse = Omit<User, "passwordHash">;

export enum SortOrder {
  ASC = "asc",
  DESC = "desc"
}

export interface ListUsersParams {
  status?: UserStatus;
  order: SortOrder | undefined;
}
