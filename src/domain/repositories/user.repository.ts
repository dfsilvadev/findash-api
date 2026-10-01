import type { User } from "../entities/user.entity.js";

export interface CreateUserInput {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface UserRepository {
  create(input: CreateUserInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
