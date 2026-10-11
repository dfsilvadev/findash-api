import { AppError } from "./app.error.js";

export class CanNotUpdateSuspendedUserError extends AppError {
  constructor(message = "Access Denied", details?: unknown) {
    super(message, 409, "CAN_NOT_UPDATE_SUSPENDED_USER", details, true);
  }
}
