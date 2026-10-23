import { AccountDoesNotExistError } from "../../../domain/errors/account-does-not-exist.error.js";

import type { AccountRepository } from "../../../domain/repositories/account.repository.js";
import type { AccountIdToDeleteDto } from "../../dtos/accounts/delete-account.dto.js";

export class DeleteAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(accountIdToDeleteDto: AccountIdToDeleteDto): Promise<void> {
    const { accountId } = accountIdToDeleteDto;

    const account = await this.accountRepository.findById(accountId);
    if (!account) throw new AccountDoesNotExistError(accountId);

    await this.accountRepository.delete(accountId);
  }
}
