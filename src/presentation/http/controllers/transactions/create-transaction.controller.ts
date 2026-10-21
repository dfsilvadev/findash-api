import { toHttpResponse } from "../../errors/http-error-mapper.js";

import { createTransactionValidator } from "../../validators/transactions/create-transaction.validator.js";

import type { CreateTransactionUseCase } from "../../../../application/use-cases/transactions/create-transaction.use-case.js";
import type { Controller } from "../../../../domain/entities/controller.interface.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class CreateTransactionController implements Controller {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const dto = createTransactionValidator.parse(request.body);

      await this.createTransactionUseCase.execute(dto);

      return {
        statusCode: 201,
        body: { message: "Transaction created successfully." }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
