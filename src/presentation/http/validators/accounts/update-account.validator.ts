import { z } from "zod";

export const updateAccountBodySchema = z
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
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided"
  });

export const updateAccountIdSchema = z.object({
  accountId: z.uuid("Invalid account ID")
});

export type UpdateAccountBodySchema = z.infer<typeof updateAccountBodySchema>;
export type UpdateAccountIdSchema = z.infer<typeof updateAccountIdSchema>;
