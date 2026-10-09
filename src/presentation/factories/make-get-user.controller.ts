import { GetUserByIdController } from "../http/controllers/get-user-by-id.controller.js";

import { makeGetUserByIdUseCase } from "../../infrastructure/factories/make-get-user.use-case.js";

export function makeGetUserByIdController() {
  const getUserByIdUseCase = makeGetUserByIdUseCase();
  return new GetUserByIdController(getUserByIdUseCase);
}
