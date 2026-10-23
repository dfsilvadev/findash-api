import { AppError } from "./app.error.js";

export class AccountDoesNotExistError extends AppError {
  constructor(accountId: string) {
    super("The specified account does not exist.", 404, "ACCOUNT_NOT_FOUND", {
      accountId
    });
  }
}
