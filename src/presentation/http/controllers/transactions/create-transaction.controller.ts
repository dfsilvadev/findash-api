import { toHttpResponse } from "../../errors/http-error-mapper.js";

import { createTransactionSchema } from "../../validators/transactions/create-transaction.validator.js";

import type { CreateTransactionUseCase } from "../../../../application/use-cases/transactions/create-transaction.use-case.js";
import type { Controller } from "../../protocols/controller.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class CreateTransactionController implements Controller {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const schema = createTransactionSchema.parse(request.body);
      await this.createTransactionUseCase.execute(schema);

      return {
        statusCode: 201,
        body: {
          code: "TRANSACTION_CREATED",
          message: "Transaction created successfully"
        }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
