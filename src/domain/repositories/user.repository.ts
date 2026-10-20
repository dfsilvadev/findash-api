import type { User } from "../../generated/prisma/client.js";
import type {
  CreateUserInput,
  ListUsersParams,
  UpdateUserInput,
  UserResponse
} from "../entities/user.entity.js";

export enum UserStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  DELETED = "DELETED"
}

export interface UserRepository {
  create(input: CreateUserInput): Promise<User>; // TODO: consider returning UserResponse instead of User
  update(id: string, input: Partial<UpdateUserInput>): Promise<UserResponse>;
  updateStatus(id: string, status: string): Promise<UserResponse>; // TODO: consider using UserStatus enum instead of string
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<User | null>; // TODO: consider returning UserResponse instead of User
  findById(id: string): Promise<UserResponse | null>;
  findAll(params: ListUsersParams): Promise<UserResponse[]>;
}
