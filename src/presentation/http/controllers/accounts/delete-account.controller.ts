import { deleteAccountValidator } from "../../validators/accounts/delete-account.validator.js";

import { toHttpResponse } from "../../errors/http-error-mapper.js";

import type { DeleteAccountUseCase } from "../../../../application/use-cases/accounts/delete-account.use-case.js";
import type { Controller } from "../../../../domain/entities/controller.interface.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class DeleteAccountController implements Controller {
  constructor(private readonly deleteAccountUseCase: DeleteAccountUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = deleteAccountValidator.parse(request.params);

      await this.deleteAccountUseCase.execute({ accountId });
      return {
        statusCode: 200,
        body: { accountId, message: "Account deleted successfully" }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
