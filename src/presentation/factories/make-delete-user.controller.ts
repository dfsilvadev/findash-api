import { DeleteUserController } from "../http/controllers/delete-user.controller.js";

import { makeDeleteUserUseCase } from "../../infrastructure/factories/make-delete-user.use-case.js";

export function makeDeleteUserController() {
  const deleteUserUseCase = makeDeleteUserUseCase();
  return new DeleteUserController(deleteUserUseCase);
}
