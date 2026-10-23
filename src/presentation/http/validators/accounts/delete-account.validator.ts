import { z } from "zod";

export const deleteAccountValidator = z.object({
  accountId: z.uuid()
});

export type DeleteAccountDto = z.infer<typeof deleteAccountValidator>;
