import { z } from "zod";

export const deleteAccountSchema = z.object({
  accountId: z.uuid()
});

export type DeleteAccountSchema = z.infer<typeof deleteAccountSchema>;
