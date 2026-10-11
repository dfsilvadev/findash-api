import { ListUsersUseCase } from "../../application/use-cases/list-users.use-case.js";
import { PrismaUserRepository } from "../persistence/prisma/repositories/prisma-user.repository.js";

export function makeListUsersUseCase() {
  const userRepository = new PrismaUserRepository();
  return new ListUsersUseCase(userRepository);
}
