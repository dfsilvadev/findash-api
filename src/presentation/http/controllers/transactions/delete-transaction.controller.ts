import { deleteTransactionValidator } from "../../validators/transactions/delete-transaction.validator.js";

import { toHttpResponse } from "../../errors/http-error-mapper.js";

import type { DeleteTransactionUseCase } from "../../../../application/use-cases/transactions/delete-transaction.use-case.js";
import type { Controller } from "../../../../domain/entities/controller.interface.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class DeleteTransactionController implements Controller {
  constructor(
    private readonly deleteTransactionUseCase: DeleteTransactionUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { transactionId, accountId } = deleteTransactionValidator.parse(
        request.body
      );
      await this.deleteTransactionUseCase.execute({ transactionId, accountId });

      return {
        statusCode: 200,
        body: { message: "Transaction deleted successfully" }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
