import { GetUserByIdController } from "../../http/controllers/users/get-user-by-id.controller.js";

import { makeGetUserByIdUseCase } from "../../../infrastructure/factories/users/make-get-user.use-case.js";

export function makeGetUserByIdController() {
  const getUserByIdUseCase = makeGetUserByIdUseCase();
  return new GetUserByIdController(getUserByIdUseCase);
}
