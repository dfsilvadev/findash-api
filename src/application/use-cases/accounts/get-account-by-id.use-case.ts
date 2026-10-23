import { AccountDoesNotExistError } from "../../../domain/errors/account-does-not-exist.error.js";

import type { PrismaAccountRepository } from "../../../infrastructure/persistence/prisma/repositories/prisma-account.repository.js";
import type { AccountResponseDto } from "../../dtos/accounts/get-account-by-id.dto.js";

export class GetAccountByIdUseCase {
  constructor(private readonly accountRepository: PrismaAccountRepository) {}

  async execute(accountId: string): Promise<AccountResponseDto> {
    const foundAccount = await this.accountRepository.findById(accountId);

    if (!foundAccount) throw new AccountDoesNotExistError(accountId);

    return foundAccount;
  }
}
