import { AccountDoesNotExistError } from "../../../domain/errors/account-does-not-exist.error.js";

import type { AccountRepository } from "../../../domain/repositories/account.repository.js";
import type { GetAccountBalanceInput } from "../../dtos/accounts/get-account-balance.dto.js";

export class GetAccountBalanceUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({ accountId }: GetAccountBalanceInput) {
    const existingAccount = await this.accountRepository.findById(accountId);
    if (!existingAccount) throw new AccountDoesNotExistError(accountId);

    const { income, expenses, investments } =
      await this.accountRepository.getTotalsByType(accountId);

    const balance = Math.round((income - expenses - investments) * 100) / 100;

    return { income, expenses, investments, balance };
  }
}
