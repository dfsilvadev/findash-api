import { UpdateUserStatusController } from "../http/controllers/update-user-status.controller.js";

import { makeUpdateUserStatusUseCase } from "../../infrastructure/factories/make-update-user-status.use-case.js";

export function makeUpdateUserStatusController() {
  const updateUserStatusUseCase = makeUpdateUserStatusUseCase();
  return new UpdateUserStatusController(updateUserStatusUseCase);
}
