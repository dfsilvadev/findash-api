import { UpdateUserStatusUseCase } from "../../application/use-cases/update-user-status.use-case.js";

import { makeUserRepository } from "./make-user.repository.js";

export function makeUpdateUserStatusUseCase() {
  const userRepository = makeUserRepository();
  return new UpdateUserStatusUseCase(userRepository);
}
