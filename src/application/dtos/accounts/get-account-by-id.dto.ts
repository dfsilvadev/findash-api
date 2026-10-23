import type { User } from "../../../generated/prisma/browser.js";

export type AccountResponseDto = Omit<User, "passwordHash">;
