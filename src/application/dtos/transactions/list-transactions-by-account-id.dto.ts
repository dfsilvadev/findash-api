export type SortOrder = "asc" | "desc";

export interface ListTransactionsByAccountIdDto {
  accountId: string; // TODO: Use authentication context instead of passing accountId directly
  page: number;
  limit: number;
  orderBy: SortOrder;
}
