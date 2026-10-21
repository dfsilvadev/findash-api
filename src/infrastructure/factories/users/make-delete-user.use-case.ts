import { DeleteUserUseCase } from "../../../application/use-cases/users/delete-user.use-case.js";

import { makeUserRepository } from "./make-user.repository.js";

export function makeDeleteUserUseCase() {
  const userRepository = makeUserRepository();
  return new DeleteUserUseCase(userRepository);
}
