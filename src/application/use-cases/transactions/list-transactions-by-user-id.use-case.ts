import { UserDoesNotExistError } from "../../../domain/errors/user-does-not-exist.error.js";

import type { TransactionRepository } from "../../../domain/repositories/transaction.repository.js";
import type { UserRepository } from "../../../domain/repositories/user.repository.js";
import type { ListTransactionsByUserIdDto } from "../../dtos/transactions/list-transactions-by-user-id.dto.js";

export class ListTransactionsByUserIdUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute({ userId }: ListTransactionsByUserIdDto) {
    const userExists = await this.userRepository.findById(userId);

    if (!userExists) throw new UserDoesNotExistError(userId);

    return this.transactionRepository.listByUserId(userId);
  }
}
