import { toHttpResponse } from "../../errors/http-error-mapper.js";

import {
  updateAccountBodyValidator,
  updateAccountIdValidator
} from "../../validators/accounts/update-account.validator.js";

import type { UpdateAccountUseCase } from "../../../../application/use-cases/accounts/update-account.use-case.js";
import type { Controller } from "../../../../domain/entities/controller.interface.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class UpdateAccountController implements Controller {
  constructor(private readonly updateAccountUseCase: UpdateAccountUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { body, params } = request;

      const { accountId } = updateAccountIdValidator.parse(params);
      const dto = updateAccountBodyValidator.parse(body);
      await this.updateAccountUseCase.execute(accountId, { ...dto });

      return {
        statusCode: 200,
        body: { accountId, message: "Account updated successfully" }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
