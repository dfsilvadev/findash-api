import { AccountDoesNotExistError } from "../../../domain/errors/account-does-not-exist.error.js";

import type { AccountRepository } from "../../../domain/repositories/account.repository.js";
import type { DeleteAccountInput } from "../../dtos/accounts/delete-account.dto.js";

export class DeleteAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({ accountId }: DeleteAccountInput) {
    const existingAccount = await this.accountRepository.findById(accountId);
    if (!existingAccount) throw new AccountDoesNotExistError(accountId);

    await this.accountRepository.delete(accountId);
  }
}
