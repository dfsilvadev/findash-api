import { AccountDoesNotExistError } from "../../../domain/errors/account-does-not-exist.error.js";

import type { AccountRepository } from "../../../domain/repositories/account.repository.js";
import type { TransactionRepository } from "../../../domain/repositories/transaction.repository.js";
import type { CreateTransactionDto } from "../../dtos/transactions/create-transaction.dto.js";

export class CreateTransactionUseCase {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly transactionRepository: TransactionRepository
  ) {}

  async execute(input: CreateTransactionDto): Promise<void> {
    const { accountId } = input;

    const account = await this.accountRepository.findById(accountId);
    if (!account) throw new AccountDoesNotExistError(accountId);

    // TODO: Add category validation or other business rules here

    await this.transactionRepository.create(input);
  }
}
