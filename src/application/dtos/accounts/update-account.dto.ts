export interface UpdateAccountInput {
  accountId: string; // TODO: Use authentication context instead of passing accountId directly
  firstName?: string;
  lastName?: string;
  email?: string;
}
