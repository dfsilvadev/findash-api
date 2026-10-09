import { CreateUserUseCase } from "../../application/use-cases/create-user.use-case.js";

import { makePasswordHasher } from "./make-password.hasher.js";
import { makeUserRepository } from "./make-user.repository.js";

export function makeCreateUserUseCase() {
  const userRepository = makeUserRepository();
  const passwordHasher = makePasswordHasher();
  return new CreateUserUseCase(userRepository, passwordHasher);
}
