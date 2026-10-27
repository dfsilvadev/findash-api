import { AccountDoesNotExistError } from "../../../domain/errors/account-does-not-exist.error.js";
import { TransactionDoesNotExistError } from "../../../domain/errors/transaction-does-not-exist.error.js";

import type { AccountRepository } from "../../../domain/repositories/account.repository.js";
import type { TransactionRepository } from "../../../domain/repositories/transaction.repository.js";
import type { DeleteTransactionInput } from "../../dtos/transactions/delete-transaction.dto.js";

export class DeleteTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountRepository: AccountRepository
  ) {}

  async execute(input: DeleteTransactionInput): Promise<void> {
    const { transactionId, accountId } = input;

    const existingAccount = await this.accountRepository.findById(accountId);
    if (!existingAccount) throw new AccountDoesNotExistError(accountId);

    const existingTransaction =
      await this.transactionRepository.findByIdAndAccountId({
        transactionId,
        accountId
      });
    if (!existingTransaction)
      throw new TransactionDoesNotExistError(transactionId);

    await this.transactionRepository.delete({ transactionId, accountId });
  }
}
