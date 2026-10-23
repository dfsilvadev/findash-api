import { AccountDoesNotExistError } from "../../../domain/errors/account-does-not-exist.error.js";
import { TransactionDoesNotExistError } from "../../../domain/errors/transaction-does-not-exist.error.js";

import type { AccountRepository } from "../../../domain/repositories/account.repository.js";
import type { TransactionRepository } from "../../../domain/repositories/transaction.repository.js";
import type { TransactionOwnerKeyDto } from "../../dtos/transactions/delete-transaction.dto.js";

export class DeleteTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountRepository: AccountRepository
  ) {}

  async execute(key: TransactionOwnerKeyDto): Promise<void> {
    const { transactionId, accountId } = key;

    const account = await this.accountRepository.findById(accountId);
    if (!account) throw new AccountDoesNotExistError(accountId);

    const transaction = await this.transactionRepository.findByIdAndAccountId({
      transactionId,
      accountId
    });
    if (!transaction) throw new TransactionDoesNotExistError(transactionId);

    await this.transactionRepository.delete(key);
  }
}
