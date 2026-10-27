import { deleteAccountSchema } from "../../validators/accounts/delete-account.validator.js";

import { toHttpResponse } from "../../errors/http-error-mapper.js";

import type { DeleteAccountUseCase } from "../../../../application/use-cases/accounts/delete-account.use-case.js";
import type { Controller } from "../../protocols/controller.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class DeleteAccountController implements Controller {
  constructor(private readonly deleteAccountUseCase: DeleteAccountUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = deleteAccountSchema.parse(request.params);

      await this.deleteAccountUseCase.execute({ accountId });
      return {
        statusCode: 200,
        body: {
          accountId,
          code: "ACCOUNT_DELETED",
          message: "Account deleted successfully"
        }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
