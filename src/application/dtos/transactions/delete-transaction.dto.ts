export interface DeleteTransactionInput {
  accountId: string; // TODO: Use authentication context instead of passing accountId directly
  transactionId: string;
}
