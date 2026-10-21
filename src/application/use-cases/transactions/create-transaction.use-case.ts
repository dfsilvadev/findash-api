import { UserDoesNotExistError } from "../../../domain/errors/user-does-not-exist.error.js";

import type { TransactionRepository } from "../../../domain/repositories/transaction.repository.js";
import type { UserRepository } from "../../../domain/repositories/user.repository.js";
import type { CreateTransactionDto } from "../../dtos/transactions/create-transaction.dto.js";

export class CreateTransactionUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly transactionRepository: TransactionRepository
  ) {}

  async execute(input: CreateTransactionDto): Promise<void> {
    const { userId } = input;

    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserDoesNotExistError(userId);

    // TODO: Add category validation or other business rules here

    await this.transactionRepository.create(input);
  }
}
