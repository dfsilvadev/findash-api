import type { UpdateUserUseCase } from "../../../application/use-cases/update-user.use-case.js";

import { toHttpResponse } from "../errors/http-error-mapper.js";

import {
  updateUserBodyValidator,
  updateUserIdValidator
} from "../validators/update-user.validator.js";

import type { Controller } from "../../../domain/entities/controller.interface.js";
import type { HttpRequest, HttpResponse } from "../types/http-types.js";

export class UpdateUserController implements Controller {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { body, params } = request;

      const { userId } = updateUserIdValidator.parse(params);
      const dto = updateUserBodyValidator.parse(body);
      await this.updateUserUseCase.execute(userId, { ...dto });

      return {
        statusCode: 200,
        body: { userId, message: "User updated successfully" }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
