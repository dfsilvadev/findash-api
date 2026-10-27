import {
  updateTransactionParamsSchema,
  updateTransactionSchema
} from "../../validators/transactions/update-transaction.validator.js";

import { toHttpResponse } from "../../errors/http-error-mapper.js";

import type { UpdateTransactionUseCase } from "../../../../application/use-cases/transactions/update-transaction.use-case.js";
import type { Controller } from "../../protocols/controller.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class UpdateTransactionController implements Controller {
  constructor(
    private readonly updateTransactionUseCase: UpdateTransactionUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const params = updateTransactionParamsSchema.parse(request.params);
      const schema = updateTransactionSchema.parse(request.body);

      const transaction = await this.updateTransactionUseCase.execute({
        ...schema,
        ...params
      });

      return {
        statusCode: 200,
        body: {
          transaction,
          code: "TRANSACTION_UPDATED",
          message: "Transaction updated successfully"
        }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
