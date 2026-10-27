import { AccountStatus } from "../../../domain/entities/account.entity.js";
import { AccountDoesNotExistError } from "../../../domain/errors/account-does-not-exist.error.js";
import { CannotUpdateSuspendedAccountError } from "../../../domain/errors/cannot-update-suspended-account.error.js";
import { EmailAlreadyInUseError } from "../../../domain/errors/email-already-in-use.error.js";

import type { AccountWithoutCredentials } from "../../../domain/entities/account.entity.js";
import type {
  AccountRepository,
  UpdateAccountData
} from "../../../domain/repositories/account.repository.js";
import type { UpdateAccountInput } from "../../dtos/accounts/update-account.dto.js";

export class UpdateAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(input: UpdateAccountInput): Promise<AccountWithoutCredentials> {
    const { accountId, firstName, lastName, email } = input;

    const existingAccount = await this.accountRepository.findById(accountId);

    if (!existingAccount) throw new AccountDoesNotExistError(accountId);

    if (existingAccount.status === AccountStatus.SUSPENDED)
      throw new CannotUpdateSuspendedAccountError(accountId);

    if (email !== undefined && email !== existingAccount.email) {
      const existingAccount = await this.accountRepository.findByEmail(email);
      if (existingAccount) throw new EmailAlreadyInUseError(email);
    }

    const changes: UpdateAccountData = {
      ...(firstName !== undefined && { firstName }),
      ...(lastName !== undefined && { lastName }),
      ...(email !== undefined && { email })
    };

    return this.accountRepository.update(accountId, changes);
  }
}
