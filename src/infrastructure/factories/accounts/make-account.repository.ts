import { PrismaAccountRepository } from "../../persistence/prisma/repositories/prisma-account.repository.js";

export function makeAccountRepository() {
  return new PrismaAccountRepository();
}
