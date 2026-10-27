import { toHttpResponse } from "../../errors/http-error-mapper.js";

import { getAccountByIdSchema } from "../../validators/accounts/get-account-by-id.validator.js";

import type { GetAccountByIdUseCase } from "../../../../application/use-cases/accounts/get-account-by-id.use-case.js";
import type { Controller } from "../../protocols/controller.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class GetAccountByIdController implements Controller {
  constructor(private readonly getAccountByIdUseCase: GetAccountByIdUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = getAccountByIdSchema.parse(request.params);

      const account = await this.getAccountByIdUseCase.execute({ accountId });
      return {
        statusCode: 200,
        body: {
          account,
          code: "ACCOUNT_RETRIEVED",
          message: "Account retrieved successfully"
        }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
