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

export interface Account {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  passwordHash: string;
  status: AccountStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type AccountWithoutCredentials = Omit<Account, "passwordHash">;
