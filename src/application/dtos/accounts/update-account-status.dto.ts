import type { NonDeletedAccountStatus } from "../../../domain/entities/account.entity.js";

export interface UpdateAccountStatusInput {
  accountId: string; // TODO: Use authentication context instead of passing accountId directly
  status: NonDeletedAccountStatus;
}
