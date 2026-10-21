import { CreateUserController } from "../../http/controllers/users/create-user.controller.js";

import { makeCreateUserUseCase } from "../../../infrastructure/factories/users/make-create-user.use-case.js";

export function makeCreateUserController() {
  const createUserUseCase = makeCreateUserUseCase();
  return new CreateUserController(createUserUseCase);
}
