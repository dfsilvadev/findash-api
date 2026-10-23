import { AppError } from "./app.error.js";

export class AccountAlreadyExistsError extends AppError {
  constructor(email: string) {
    super(
      `An account with email ${email} already exists`,
      409,
      "ACCOUNT_ALREADY_EXISTS",
      { email }
    );
  }
}
