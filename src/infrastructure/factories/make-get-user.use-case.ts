import { GetUserByIdUseCase } from "../../application/use-cases/get-user-by-id.use-case.js";

import { makeUserRepository } from "./make-user.repository.js";

export function makeGetUserByIdUseCase() {
  const userRepository = makeUserRepository();
  return new GetUserByIdUseCase(userRepository);
}
