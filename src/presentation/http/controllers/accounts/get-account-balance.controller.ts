import { getAccountBalanceSchema } from "../../validators/accounts/get-account-balance.validator.js";

import { toHttpResponse } from "../../errors/http-error-mapper.js";

import type { GetAccountBalanceUseCase } from "../../../../application/use-cases/accounts/get-account-balance.use-case.js";
import type { Controller } from "../../protocols/controller.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class GetAccountBalanceController implements Controller {
  constructor(
    private readonly getAccountBalanceUseCase: GetAccountBalanceUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = getAccountBalanceSchema.parse(request.params);
      const balance = await this.getAccountBalanceUseCase.execute({
        accountId
      });
      return {
        statusCode: 200,
        body: {
          balance,
          code: "BALANCE_SUCCESS",
          message: "Balance retrieved successfully"
        }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
