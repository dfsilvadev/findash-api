import type { User } from "../../generated/prisma/client.js";

export const AccountStatus = {
  ACTIVE: "ACTIVE",
  SUSPENDED: "SUSPENDED",
  DELETED: "DELETED"
} as const;
export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus];

export type NonDeletedAccountStatus = Exclude<
  AccountStatus,
  typeof AccountStatus.DELETED
>;

export type AccountEntity = User;

export interface CreateAccountBodyInput {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export type UpdateAccountBodyInput = Partial<
  Omit<CreateAccountBodyInput, "password">
>;

export type AccountResponse = Omit<AccountEntity, "passwordHash">;

export enum AccountSortOrder {
  ASC = "asc",
  DESC = "desc"
}

export interface ListAccountsParams {
  status?: AccountStatus;
  order: AccountSortOrder | undefined;
}
