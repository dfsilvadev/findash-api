import { listTransactionsByAccountIdQueryParamsValidator } from "../../validators/transactions/list-transactions-by-account-id.validator.js";

import { toHttpResponse } from "../../errors/http-error-mapper.js";

import type { ListTransactionsByAccountIdUseCase } from "../../../../application/use-cases/transactions/list-transactions-by-account-id.use-case.js";
import type { Controller } from "../../protocols/controller.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class ListTransactionsByAccountIdController implements Controller {
  constructor(
    private readonly listTransactionsByAccountIdUseCase: ListTransactionsByAccountIdUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { orderBy, ...query } =
        listTransactionsByAccountIdQueryParamsValidator.parse(request.query);
      const transactions =
        await this.listTransactionsByAccountIdUseCase.execute({
          ...query,
          order: orderBy
        });

      return {
        statusCode: 200,
        body: {
          transactions,
          code: "TRANSACTIONS_LISTED",
          message: "Transactions listed successfully"
        }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
