import type {
  Account,
  AccountStatus,
  AccountWithoutCredentials,
  NonDeletedAccountStatus
} from "../entities/account.entity.js";
import type { SortOrder } from "../shared/sort-order.js";

export interface CreateAccountData {
  firstName: string;
  lastName?: string;
  email: string;
  passwordHash: string;
}

export type UpdateAccountData = Partial<
  Pick<CreateAccountData, "firstName" | "lastName" | "email">
>;

export interface ListAccountsParams {
  status?: AccountStatus;
  order?: SortOrder;
}

export interface AccountTransactionTotals {
  income: number;
  expenses: number;
  investments: number;
}

export interface AccountRepository {
  create(data: CreateAccountData): Promise<AccountWithoutCredentials>;
  update(
    accountId: string,
    data: UpdateAccountData
  ): Promise<AccountWithoutCredentials>;
  updateStatus(
    accountId: string,
    status: NonDeletedAccountStatus
  ): Promise<AccountWithoutCredentials>;
  delete(accountId: string): Promise<void>;
  findByEmail(email: string): Promise<Account | null>;
  findById(accountId: string): Promise<AccountWithoutCredentials | null>;
  findAll(params: ListAccountsParams): Promise<AccountWithoutCredentials[]>;
  getTotalsByType(accountId: string): Promise<AccountTransactionTotals>;
}
