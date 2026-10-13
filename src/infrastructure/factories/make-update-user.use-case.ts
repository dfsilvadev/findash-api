import { UpdateUserUseCase } from "../../application/use-cases/users/update-user.use-case.js";

import { makeUserRepository } from "./make-user.repository.js";

export function makeUpdateUserUseCase() {
  const userRepository = makeUserRepository();
  return new UpdateUserUseCase(userRepository);
}
