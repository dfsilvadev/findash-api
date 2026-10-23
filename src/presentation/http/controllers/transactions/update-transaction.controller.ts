import {
  updateTransactionParamsValidator,
  updateTransactionValidator
} from "../../validators/transactions/update-transaction.validator.js";

import { toHttpResponse } from "../../errors/http-error-mapper.js";

import type { UpdateTransactionUseCase } from "../../../../application/use-cases/transactions/update-transaction.use-case.js";
import type { Controller } from "../../../../domain/entities/controller.interface.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class UpdateTransactionController implements Controller {
  constructor(
    private readonly updateTransactionUseCase: UpdateTransactionUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const params = updateTransactionParamsValidator.parse(request.params);
      const changes = updateTransactionValidator.parse(request.body);

      const transaction = await this.updateTransactionUseCase.execute({
        ...changes,
        ...params
      });

      return { statusCode: 200, body: { transaction } };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
