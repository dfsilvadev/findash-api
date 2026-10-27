import { z } from "zod";

import { CategoryAssetClass } from "../../../../domain/entities/category.entity.js";
import { FinancialType } from "../../../../domain/shared/financial-type.js";

export const createCategorySchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters long"),
  description: z.string().optional(),
  type: z.enum(FinancialType),
  assetClass: z.enum(CategoryAssetClass).optional(),
  accountId: z.uuid("Invalid account ID")
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
