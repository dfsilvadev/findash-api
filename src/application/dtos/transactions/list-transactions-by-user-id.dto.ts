export type SortOrder = "asc" | "desc";

export interface ListTransactionsByUserIdDto {
  userId: string; // TODO: Use authentication context instead of passing userId directly
  page: number;
  limit: number;
  orderBy: SortOrder;
}
