import { z } from "zod";

export const createUserValidator = z.object({
  firstName: z.string().min(5, "First name must be at least 5 characters long"),
  lastName: z.string().min(5, "Last name must be at least 5 characters long"),
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
});

export type CreateUserValidator = z.infer<typeof createUserValidator>;
