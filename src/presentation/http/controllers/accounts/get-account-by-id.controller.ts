import { toHttpResponse } from "../../errors/http-error-mapper.js";

import { getAccountByIdValidator } from "../../validators/accounts/get-account-by-id.validator.js";

import type { GetAccountByIdUseCase } from "../../../../application/use-cases/accounts/get-account-by-id.use-case.js";
import type { Controller } from "../../../../domain/entities/controller.interface.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class GetAccountByIdController implements Controller {
  constructor(private readonly getAccountByIdUseCase: GetAccountByIdUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const dto = getAccountByIdValidator.parse(request.params);

      const accountResponse = await this.getAccountByIdUseCase.execute(
        dto.accountId
      );
      return {
        statusCode: 200,
        body: { account: accountResponse }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
