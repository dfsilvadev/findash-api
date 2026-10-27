import { AccountAlreadyExistsError } from "../../../domain/errors/account-already-exists.error.js";

import type { AccountRepository } from "../../../domain/repositories/account.repository.js";
import type { PasswordHasherService } from "../../../domain/services/password-hasher.service.js";
import type { CreateAccountInput } from "../../dtos/accounts/create-account.dto.js";

export class CreateAccountUseCase {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly passwordHasher: PasswordHasherService
  ) {}

  async execute(input: CreateAccountInput) {
    const { password, ...accountData } = input;
    const existingAccount = await this.accountRepository.findByEmail(
      accountData.email
    );

    if (existingAccount) throw new AccountAlreadyExistsError(accountData.email);

    const passwordHash = await this.passwordHasher.hash(password);

    await this.accountRepository.create({ ...accountData, passwordHash });
  }
}
