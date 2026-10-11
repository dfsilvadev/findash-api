import { UpdateUserController } from "../http/controllers/update-user.controller.js";

import { makeUpdateUserUseCase } from "../../infrastructure/factories/make-update-user.use-case.js";

export function makeUpdateUserController() {
  const updateUserUseCase = makeUpdateUserUseCase();
  return new UpdateUserController(updateUserUseCase);
}
