import { toHttpResponse } from "../../errors/http-error-mapper.js";

import {
  updateAccountStatusParamsValidator,
  updateAccountStatusValidator
} from "../../validators/accounts/update-account-status.validator.js";

import type { UpdateAccountStatusUseCase } from "../../../../application/use-cases/accounts/update-account-status.use-case.js";
import type { Controller } from "../../../../domain/entities/controller.interface.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class UpdateAccountStatusController implements Controller {
  constructor(
    private readonly updateAccountStatusUseCase: UpdateAccountStatusUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { params, body } = request;

      const { accountId } = updateAccountStatusParamsValidator.parse(params);
      const { status } = updateAccountStatusValidator.parse(body);

      const result = await this.updateAccountStatusUseCase.execute(
        accountId,
        status
      );
      return {
        statusCode: 200,
        body: result
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
