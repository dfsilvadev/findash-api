import { AccountAlreadyExistsError } from "../../../domain/errors/account-already-exists.error.js";

import type { AccountRepository } from "../../../domain/repositories/account.repository.js";
import type { PasswordHasherService } from "../../../domain/services/password-hasher.service.js";
import type { CreateAccountBodyDto } from "../../dtos/accounts/create-account.dto.js";

export class CreateAccountUseCase {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly passwordHasher: PasswordHasherService
  ) {}

  async execute(input: CreateAccountBodyDto) {
    const existingAccount = await this.accountRepository.findByEmail(
      input.email
    );

    if (existingAccount) throw new AccountAlreadyExistsError(input.email);

    const hashedPassword = await this.passwordHasher.hash(input.password);

    await this.accountRepository.create({
      ...input,
      password: hashedPassword
    });
  }
}
