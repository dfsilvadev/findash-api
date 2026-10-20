import { z } from "zod";

export const createCategoryValidator = z.object({
  name: z.string().min(5, "Name must be at least 5 characters long"),
  description: z.string().optional(),
  type: z.enum(["INCOME", "EXPENSE", "INVESTMENT"]),
  assetClass: z.enum(["FIXED_INCOME", "VARIABLE_INCOME"]).optional(),
  userId: z.uuid("Invalid user ID")
});

export type CreateCategoryValidator = z.infer<typeof createCategoryValidator>;
