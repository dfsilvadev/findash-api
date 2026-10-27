import type { AccountStatus } from "../../../domain/entities/account.entity.js";
import type { SortOrder } from "../../../domain/shared/sort-order.js";

export interface ListAccountsInput {
  status?: AccountStatus;
  order?: SortOrder;
}
