import { UpdateUserController } from "../../http/controllers/users/update-user.controller.js";

import { makeUpdateUserUseCase } from "../../../infrastructure/factories/users/make-update-user.use-case.js";

export function makeUpdateUserController() {
  const updateUserUseCase = makeUpdateUserUseCase();
  return new UpdateUserController(updateUserUseCase);
}
