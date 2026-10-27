import { AccountDoesNotExistError } from "../../../domain/errors/account-does-not-exist.error.js";

import type { AccountRepository } from "../../../domain/repositories/account.repository.js";
import type { UpdateAccountStatusInput } from "../../dtos/accounts/update-account-status.dto.js";

export class UpdateAccountStatusUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({ accountId, status }: UpdateAccountStatusInput) {
    const accountExists = await this.accountRepository.findById(accountId);
    if (!accountExists) throw new AccountDoesNotExistError(accountId);

    return this.accountRepository.updateStatus(accountId, status);
  }
}
