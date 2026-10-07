import type { User } from "../../generated/prisma/client.js";
import type {
  CreateUserInput,
  ListUsersParams,
  UpdateUserInput,
  UserResponse
} from "../entities/user.entity.js";

export interface UserRepository {
  create(input: CreateUserInput): Promise<User>;
  update(id: string, input: Partial<UpdateUserInput>): Promise<UserResponse>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<UserResponse | null>;
  findAll(params: ListUsersParams): Promise<UserResponse[]>;
}
