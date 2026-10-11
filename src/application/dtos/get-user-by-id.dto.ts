import type { User } from "../../generated/prisma/browser.js";

export type UserResponseDto = Omit<User, "passwordHash">;
