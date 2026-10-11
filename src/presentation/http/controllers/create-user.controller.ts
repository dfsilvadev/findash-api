import { createUserValidator } from "../validators/create-user.validator.js";

import { toHttpResponse } from "../errors/http-error-mapper.js";

import type { CreateUserUseCase } from "../../../application/use-cases/create-user.use-case.js";
import type { Controller } from "../../../domain/entities/controller.interface.js";
import type { HttpRequest, HttpResponse } from "../types/http-types.js";

export class CreateUserController implements Controller {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const dto = createUserValidator.parse(request.body);
      await this.createUserUseCase.execute(dto);

      return {
        statusCode: 201,
        body: { message: "User created successfully" }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
