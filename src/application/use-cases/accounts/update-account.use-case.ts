import { AccountDoesNotExistError } from "../../../domain/errors/account-does-not-exist.error.js";
import { CanNotUpdateSuspendedAccountError } from "../../../domain/errors/can-not-update-suspended-account.error.js";
import { EmailAlreadyInUseError } from "../../../domain/errors/email-already-in-use.error.js";

import type {
  AccountResponse,
  UpdateAccountBodyInput
} from "../../../domain/entities/account.entity.js";
import type { AccountRepository } from "../../../domain/repositories/account.repository.js";
import type {
  UpdateAccountInputDto,
  AccountId
} from "../../dtos/accounts/update-account.dto.js";

export class UpdateAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(
    id: AccountId,
    input: UpdateAccountInputDto
  ): Promise<AccountResponse> {
    const existingAccount = await this.accountRepository.findById(id);

    if (!existingAccount) throw new AccountDoesNotExistError(id);

    if (existingAccount.status === "SUSPENDED")
      throw new CanNotUpdateSuspendedAccountError(
        "Cannot update suspended account"
      );

    const { firstName, lastName, email } = input;

    if (email !== undefined && email !== existingAccount.email) {
      const existingAccount = await this.accountRepository.findByEmail(email);
      if (existingAccount) throw new EmailAlreadyInUseError(email);
    }

    const changes: UpdateAccountBodyInput = {
      ...(firstName !== undefined && { firstName }),
      ...(lastName !== undefined && { lastName }),
      ...(email !== undefined && { email })
    };

    return this.accountRepository.update(id, changes);
  }
}
