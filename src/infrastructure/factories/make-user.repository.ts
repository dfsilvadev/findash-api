import { PrismaUserRepository } from "../persistence/prisma/repositories/prisma-user.repository.js";

export function makeUserRepository() {
  return new PrismaUserRepository();
}
