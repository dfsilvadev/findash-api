import { env } from "../../config/env.js";
import { BcryptPasswordHasherService } from "../security/bcrypt-password-hasher.service.js";

export function makePasswordHasher() {
  return new BcryptPasswordHasherService(env.PASSWORD_SALT_ROUNDS);
}
