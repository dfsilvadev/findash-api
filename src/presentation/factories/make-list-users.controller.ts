import { ListUsersController } from "../http/controllers/list-users.controller.js";

import { makeListUsersUseCase } from "../../infrastructure/factories/make-list-users.use-case.js";

export function makeListUsersController() {
  const listUsersUseCase = makeListUsersUseCase();
  return new ListUsersController(listUsersUseCase);
}
