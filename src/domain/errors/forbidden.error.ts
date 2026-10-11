import { AppError } from "./app.error.js";

export class ForbiddenError extends AppError {
  constructor(message = "Access Denied", details?: unknown) {
    super(message, 403, "FORBIDDEN", details, true);
  }
}
