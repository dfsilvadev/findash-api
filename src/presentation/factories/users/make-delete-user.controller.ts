import { DeleteUserController } from "../../http/controllers/users/delete-user.controller.js";

import { makeDeleteUserUseCase } from "../../../infrastructure/factories/users/make-delete-user.use-case.js";

export function makeDeleteUserController() {
  const deleteUserUseCase = makeDeleteUserUseCase();
  return new DeleteUserController(deleteUserUseCase);
}
