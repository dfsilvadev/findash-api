import { TransactionDoesNotExistError } from "../../../domain/errors/transaction-does-not-exist.error.js";
import { UserDoesNotExistError } from "../../../domain/errors/user-does-not-exist.error.js";

import type { TransactionRepository } from "../../../domain/repositories/transaction.repository.js";
import type { UserRepository } from "../../../domain/repositories/user.repository.js";
import type { TransactionOwnerKeyDto } from "../../dtos/transactions/delete-transaction.dto.js";

export class DeleteTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(key: TransactionOwnerKeyDto): Promise<void> {
    const { transactionId, userId } = key;

    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserDoesNotExistError(userId);

    const transaction = await this.transactionRepository.findByIdAndUserId({
      transactionId,
      userId
    });
    if (!transaction) throw new TransactionDoesNotExistError(transactionId);

    await this.transactionRepository.delete(key);
  }
}
