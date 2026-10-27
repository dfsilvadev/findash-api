import { toHttpResponse } from "../../errors/http-error-mapper.js";

import { listAccountsValidator } from "../../validators/accounts/list-accounts.validator.js";

import type { ListAccountsUseCase } from "../../../../application/use-cases/accounts/list-accounts.use-case.js";
import type { Controller } from "../../protocols/controller.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class ListAccountsController implements Controller {
  constructor(private readonly listAccountsUseCase: ListAccountsUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const schema = listAccountsValidator.parse(request.query ?? {});

      const accounts = await this.listAccountsUseCase.execute(schema);

      return {
        statusCode: 200,
        body: {
          accounts,
          code: "ACCOUNTS_LISTED",
          message: "Accounts listed successfully"
        }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
