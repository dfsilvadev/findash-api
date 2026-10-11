import { z } from "zod";

export const deleteUserValidator = z.object({
  userId: z.uuid()
});

export type DeleteUserDto = z.infer<typeof deleteUserValidator>;
