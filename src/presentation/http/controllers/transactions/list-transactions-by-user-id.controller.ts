import { listTransactionsByUserIdQueryValidator } from "../../validators/transactions/list-transactions-by-user-id.validator.js";

import { toHttpResponse } from "../../errors/http-error-mapper.js";

import type { ListTransactionsByUserIdUseCase } from "../../../../application/use-cases/transactions/list-transactions-by-user-id.use-case.js";
import type { Controller } from "../../../../domain/entities/controller.interface.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class ListTransactionsByUserIdController implements Controller {
  constructor(
    private readonly listTransactionsByUserIdUseCase: ListTransactionsByUserIdUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = listTransactionsByUserIdQueryValidator.parse(
        request.query
      );
      const transactions = await this.listTransactionsByUserIdUseCase.execute({
        userId
      });

      return {
        statusCode: 200,
        body: { transactions }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
