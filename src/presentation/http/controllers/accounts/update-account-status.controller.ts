import { toHttpResponse } from "../../errors/http-error-mapper.js";

import {
  updateAccountStatusBodySchema,
  updateAccountStatusParamsSchema
} from "../../validators/accounts/update-account-status.validator.js";

import type { UpdateAccountStatusUseCase } from "../../../../application/use-cases/accounts/update-account-status.use-case.js";
import type { Controller } from "../../protocols/controller.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class UpdateAccountStatusController implements Controller {
  constructor(
    private readonly updateAccountStatusUseCase: UpdateAccountStatusUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { params, body } = request;
      const { accountId } = updateAccountStatusParamsSchema.parse(params);
      const { status } = updateAccountStatusBodySchema.parse(body);
      await this.updateAccountStatusUseCase.execute({ accountId, status });

      return {
        statusCode: 200,
        body: {
          code: "ACCOUNT_STATUS_UPDATED",
          message: "Account status updated successfully"
        }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
