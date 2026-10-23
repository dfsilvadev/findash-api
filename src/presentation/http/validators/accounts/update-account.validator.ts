import { z } from "zod";

export const updateAccountBodyValidator = z
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

export const updateAccountIdValidator = z.object({
  accountId: z.uuid("Invalid account ID")
});

export type UpdateAccountBodyValidator = z.infer<
  typeof updateAccountBodyValidator
>;
export type UpdateAccountIdValidator = z.infer<typeof updateAccountIdValidator>;
