import { AccountDoesNotExistError } from "../../../domain/errors/account-does-not-exist.error.js";

import type { AccountRepository } from "../../../domain/repositories/account.repository.js";
import type {
  AccountId,
  AccountStatusDto
} from "../../dtos/accounts/update-account-status.dto.js";

export class UpdateAccountStatusUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(id: AccountId, status: AccountStatusDto) {
    const accountExists = await this.accountRepository.findById(id);
    if (!accountExists) throw new AccountDoesNotExistError(id);

    return this.accountRepository.updateStatus(id, status);
  }
}
