export type UserId = string;

export interface UpdateUserInputDto {
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
}
