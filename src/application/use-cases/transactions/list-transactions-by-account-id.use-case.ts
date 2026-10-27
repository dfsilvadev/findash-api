import { AccountDoesNotExistError } from "../../../domain/errors/account-does-not-exist.error.js";

import type { AccountRepository } from "../../../domain/repositories/account.repository.js";
import type { TransactionRepository } from "../../../domain/repositories/transaction.repository.js";
import type { ListTransactionsByAccountIdInput } from "../../dtos/transactions/list-transactions-by-account-id.dto.js";

export class ListTransactionsByAccountIdUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountRepository: AccountRepository
  ) {}

  private readonly FIRST_PAGE = 1;

  async execute(input: ListTransactionsByAccountIdInput) {
    const { accountId, page, limit } = input;

    const existingAccount = await this.accountRepository.findById(accountId);

    if (!existingAccount) throw new AccountDoesNotExistError(accountId);

    const { items, total } =
      await this.transactionRepository.listByAccountId(input);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > this.FIRST_PAGE;

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
        firstPage: hasPreviousPage ? this.FIRST_PAGE : null,
        lastPage: hasNextPage ? totalPages : null
      }
    };
  }
}
