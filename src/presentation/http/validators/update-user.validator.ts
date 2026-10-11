import { z } from "zod";

export const updateUserBodyValidator = z
  .object({
    firstName: z
      .string()
      .min(5, "First name must be at least 5 characters long")
      .optional(),
    lastName: z
      .string()
      .min(5, "Last name must be at least 5 characters long")
      .optional(),
    email: z.email().optional()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided"
  });

export const updateUserIdValidator = z.object({
  userId: z.uuid("Invalid user ID")
});

export type UpdateUserBodyValidator = z.infer<typeof updateUserBodyValidator>;
export type UpdateUserIdValidator = z.infer<typeof updateUserIdValidator>;
