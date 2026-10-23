import { z } from "zod";

export const updateAccountStatusValidator = z.object({
  status: z.enum(["ACTIVE", "SUSPENDED"])
});

export const updateAccountStatusParamsValidator = z.object({
  accountId: z.uuid("Invalid account ID")
});

export type UpdateAccountStatusParams = z.infer<
  typeof updateAccountStatusParamsValidator
>;
export type UpdateAccountStatusBody = z.infer<
  typeof updateAccountStatusValidator
>;
