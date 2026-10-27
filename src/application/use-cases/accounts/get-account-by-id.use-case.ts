import { AccountDoesNotExistError } from "../../../domain/errors/account-does-not-exist.error.js";

import type { AccountWithoutCredentials } from "../../../domain/entities/account.entity.js";
import type { AccountRepository } from "../../../domain/repositories/account.repository.js";
import type { GetAccountByIdInput } from "../../dtos/accounts/get-account-by-id.dto.js";

export class GetAccountByIdUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({
    accountId
  }: GetAccountByIdInput): Promise<AccountWithoutCredentials> {
    const account = await this.accountRepository.findById(accountId);

    if (!account) throw new AccountDoesNotExistError(accountId);

    return account;
  }
}
