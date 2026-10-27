import { createAccountBodySchema } from "../../validators/accounts/create-account.validator.js";

import { toHttpResponse } from "../../errors/http-error-mapper.js";

import type { CreateAccountUseCase } from "../../../../application/use-cases/accounts/create-account.use-case.js";
import type { Controller } from "../../protocols/controller.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class CreateAccountController implements Controller {
  constructor(private readonly createAccountUseCase: CreateAccountUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const schema = createAccountBodySchema.parse(request.body);
      await this.createAccountUseCase.execute(schema);

      return {
        statusCode: 201,
        body: {
          code: "ACCOUNT_CREATED",
          message: "Account created successfully"
        }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
