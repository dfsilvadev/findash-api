import { CreateUserController } from "../http/controllers/create-user.controller.js";

import { makeCreateUserUseCase } from "../../infrastructure/factories/make-create-user-use-case.js";

export function makeCreateUserController() {
  const createUserUseCase = makeCreateUserUseCase();
  return new CreateUserController(createUserUseCase);
}
