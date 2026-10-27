import type { AccountWithoutCredentials } from "../../../domain/entities/account.entity.js";
import type { AccountRepository } from "../../../domain/repositories/account.repository.js";
import type { ListAccountsInput } from "../../dtos/accounts/list-accounts.dto.js";

export class ListAccountsUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(
    input: ListAccountsInput
  ): Promise<AccountWithoutCredentials[]> {
    return this.accountRepository.findAll(input);
  }
}
