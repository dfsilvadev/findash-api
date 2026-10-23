import { AccountDoesNotExistError } from "../../../domain/errors/account-does-not-exist.error.js";

import type { AccountRepository } from "../../../domain/repositories/account.repository.js";
import type { TransactionRepository } from "../../../domain/repositories/transaction.repository.js";
import type { ListTransactionsByAccountIdDto } from "../../dtos/transactions/list-transactions-by-account-id.dto.js";

const FIRST_PAGE = 1;

export class ListTransactionsByAccountIdUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountRepository: AccountRepository
  ) {}

  async execute(input: ListTransactionsByAccountIdDto) {
    const { accountId, page, limit } = input;

    const accountExists = await this.accountRepository.findById(accountId);

    if (!accountExists) throw new AccountDoesNotExistError(accountId);

    const { items, total } =
      await this.transactionRepository.listByAccountId(input);

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
