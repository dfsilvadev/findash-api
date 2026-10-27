import type { SortOrder } from "../../../domain/shared/sort-order.js";

export interface ListTransactionsByAccountIdInput {
  accountId: string; // TODO: Use authentication context instead of passing accountId directly
  page: number;
  limit: number;
  order: SortOrder;
}
