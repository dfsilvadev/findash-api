import { AppError } from "./app.error.js";

export class CannotUpdateSuspendedAccountError extends AppError {
  constructor(accountId: string) {
    super(
      "Cannot update a suspended account.",
      409,
      "CAN_NOT_UPDATE_SUSPENDED_ACCOUNT",
      { accountId }
    );
  }
}
