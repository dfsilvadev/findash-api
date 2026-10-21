import { z } from "zod";

export const getUserByIdValidator = z.object({
  userId: z.uuid()
});

export type GetUserByIdValidator = z.infer<typeof getUserByIdValidator>;
