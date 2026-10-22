import { UserDoesNotExistError } from "../../../domain/errors/user-does-not-exist.error.js";

import type { TransactionRepository } from "../../../domain/repositories/transaction.repository.js";
import type { UserRepository } from "../../../domain/repositories/user.repository.js";
import type { ListTransactionsByUserIdDto } from "../../dtos/transactions/list-transactions-by-user-id.dto.js";

const FIRST_PAGE = 1;

export class ListTransactionsByUserIdUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(input: ListTransactionsByUserIdDto) {
    const { userId, page, limit } = input;

    const userExists = await this.userRepository.findById(userId);

    if (!userExists) throw new UserDoesNotExistError(userId);

    const { items, total } =
      await this.transactionRepository.listByUserId(input);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > FIRST_PAGE;

    return {
      transactions: items,
      pagination: {
        totalItems: total,
        totalPages,
        registersPerPage: limit,
        hasNextPage,
        hasPreviousPage,
        nextPage: hasNextPage ? page + 1 : null,
        previousPage: hasPreviousPage ? page - 1 : null,
        firstPage: hasPreviousPage ? FIRST_PAGE : null,
        lastPage: hasNextPage ? totalPages : null
      }
    };
  }
}
