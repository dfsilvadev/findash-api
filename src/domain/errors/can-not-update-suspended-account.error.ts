import { AppError } from "./app.error.js";

export class CanNotUpdateSuspendedAccountError extends AppError {
  constructor(message = "Access Denied", details?: unknown) {
    super(message, 409, "CAN_NOT_UPDATE_SUSPENDED_ACCOUNT", details, true);
  }
}
