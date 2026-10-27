import { toHttpResponse } from "../../errors/http-error-mapper.js";

import {
  updateAccountBodySchema,
  updateAccountIdSchema
} from "../../validators/accounts/update-account.validator.js";

import type { UpdateAccountUseCase } from "../../../../application/use-cases/accounts/update-account.use-case.js";
import type { Controller } from "../../protocols/controller.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class UpdateAccountController implements Controller {
  constructor(private readonly updateAccountUseCase: UpdateAccountUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { body, params } = request;

      const { accountId } = updateAccountIdSchema.parse(params);
      const schema = updateAccountBodySchema.parse(body);
      await this.updateAccountUseCase.execute({ accountId, ...schema });

      return {
        statusCode: 200,
        body: {
          accountId,
          code: "ACCOUNT_UPDATED_SUCCESSFULLY",
          message: "Account updated successfully"
        }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
