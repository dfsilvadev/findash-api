import bcrypt from "bcryptjs";

import { logger } from "../logger/logger.js";

import type { PasswordHasherService } from "../../domain/services/password-hasher.service.js";

export class BcryptPasswordHasherService implements PasswordHasherService {
  constructor(private readonly rounds: number) {}

  async hash(password: string): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(password, this.rounds);
      return hashedPassword;
    } catch (error) {
      logger.error("Error hashing password", {
        error: error instanceof Error ? error.message : "Unknown error"
      });

      throw new Error("Failed to hash password", { cause: error });
    }
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);
      return isMatch;
    } catch (error) {
      logger.error("Error comparing password", {
        error: error instanceof Error ? error.message : "Unknown error"
      });
      throw new Error("Failed to compare password", { cause: error });
      return false;
    }
  }
}
