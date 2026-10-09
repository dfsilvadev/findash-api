import { z } from "zod";

export const updateUserStatusValidator = z.object({
  status: z.enum(["ACTIVE", "SUSPENDED"])
});

export const updateUserStatusParamsValidator = z.object({
  userId: z.uuid("Invalid user ID")
});

export type UpdateUserStatusParams = z.infer<
  typeof updateUserStatusParamsValidator
>;
export type UpdateUserStatusBody = z.infer<typeof updateUserStatusValidator>;
