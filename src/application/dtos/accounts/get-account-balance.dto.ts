export interface GetAccountBalanceInput {
  accountId: string; // TODO: Use authentication context instead of passing accountId directly
}

export interface GetAccountBalanceOutput {
  income: number;
  expenses: number;
  investments: number;
  balance: number;
}
