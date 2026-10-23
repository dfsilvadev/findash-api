export interface CreateAccountBodyDto {
  readonly firstName: string;
  readonly lastName?: string;
  readonly email: string;
  readonly password: string;
}
