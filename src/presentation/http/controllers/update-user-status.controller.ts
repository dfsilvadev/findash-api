import {
  updateUserStatusParamsValidator,
  updateUserStatusValidator
} from "../validators/update-user-status.validator.js";

import { toHttpResponse } from "../errors/http-error-mapper.js";

import type { UpdateUserStatusUseCase } from "../../../application/use-cases/update-user-status.use-case.js";
import type { Controller } from "../../../domain/entities/controller.interface.js";
import type { HttpRequest, HttpResponse } from "../types/http-types.js";

export class UpdateUserStatusController implements Controller {
  constructor(
    private readonly updateUserStatusUseCase: UpdateUserStatusUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { params, body } = request;

      const { userId } = updateUserStatusParamsValidator.parse(params);
      const { status } = updateUserStatusValidator.parse(body);

      const result = await this.updateUserStatusUseCase.execute(userId, status);
      return {
        statusCode: 200,
        body: result
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
