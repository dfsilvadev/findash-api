export type UserStatus = "ACTIVE" | "SUSPENDED";

export interface User {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  passwordHash: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
