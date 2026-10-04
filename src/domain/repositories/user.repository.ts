import type { User } from "../../generated/prisma/client.js";
import type {
  CreateUserInput,
  ListUsersParams,
  UserResponse
} from "../entities/user.entity.js";

export interface UserRepository {
  create(input: CreateUserInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findAll(params: ListUsersParams): Promise<UserResponse[]>;
}
