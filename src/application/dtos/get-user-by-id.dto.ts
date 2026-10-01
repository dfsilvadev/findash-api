import type { User } from "../../generated/prisma/client.js";

export type UserResponseDto = Omit<User, "passwordHash">;
