import { AppError } from "./app.error.js";

export class EmailAlreadyInUseError extends AppError {
  constructor(email: string) {
    super(`The email ${email} is already in use`, 409, "EMAIL_ALREADY_IN_USE", {
      email
    });
  }
}
