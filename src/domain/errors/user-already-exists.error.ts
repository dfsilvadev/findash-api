import { AppError } from "./app.error.js";

export class UserAlreadyExistsError extends AppError {
  constructor(email: string) {
    super(
      `A user with email ${email} already exists`,
      409,
      "USER_ALREADY_EXISTS",
      { email }
    );
  }
}
