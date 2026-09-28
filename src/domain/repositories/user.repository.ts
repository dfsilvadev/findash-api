import type { User } from "../entities/user.entity.js";

export interface CreateUserInput {
  firstName: string;
  lastName?: string;
  email: string;
  passwordHash: string;
}

export interface UserRepository {
  create(input: CreateUserInput): Promise<User>;
}
