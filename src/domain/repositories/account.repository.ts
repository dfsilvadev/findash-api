import type {
  AccountResponse,
  CreateAccountBodyInput,
  ListAccountsParams,
  NonDeletedAccountStatus,
  UpdateAccountBodyInput
} from "../entities/account.entity.js";

export interface AccountRepository {
  create(input: CreateAccountBodyInput): Promise<AccountResponse>;
  update(
    id: string,
    input: Partial<UpdateAccountBodyInput>
  ): Promise<AccountResponse>;
  updateStatus(
    id: string,
    status: NonDeletedAccountStatus
  ): Promise<AccountResponse>;
  delete(accountId: string): Promise<void>;
  findByEmail(email: string): Promise<AccountResponse | null>;
  findById(accountId: string): Promise<AccountResponse | null>;
  findAll(params: ListAccountsParams): Promise<AccountResponse[]>;
}
