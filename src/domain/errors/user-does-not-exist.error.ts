import { AppError } from "./app.error.js";

export class UserDoesNotExistError extends AppError {
  constructor(userId: string) {
    super("The specified user does not exist.", 404, "USER_NOT_FOUND", {
      userId
    });
  }
}
