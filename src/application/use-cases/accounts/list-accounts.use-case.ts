import type {
  AccountResponse,
  ListAccountsParams
} from "../../../domain/entities/account.entity.js";
import type { PrismaAccountRepository } from "../../../infrastructure/persistence/prisma/repositories/prisma-account.repository.js";

export class ListAccountsUseCase {
  constructor(private readonly accountRepository: PrismaAccountRepository) {}

  async execute(params: ListAccountsParams): Promise<AccountResponse[]> {
    const accounts = await this.accountRepository.findAll(params);
    return accounts;
  }
}
