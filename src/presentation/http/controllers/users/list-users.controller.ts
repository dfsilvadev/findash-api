import { toHttpResponse } from "../../errors/http-error-mapper.js";

import { listUsersValidator } from "../../validators/users/list-users.validator.js";

import type { ListUsersUseCase } from "../../../../application/use-cases/users/list-users.use-case.js";
import type { Controller } from "../../../../domain/entities/controller.interface.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class ListUsersController implements Controller {
  constructor(private readonly listUsersUseCase: ListUsersUseCase) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const dto = listUsersValidator.parse(request.query ?? {});

      const users = await this.listUsersUseCase.execute({
        status: dto.status,
        order: dto.order
      });

      return {
        statusCode: 200,
        body: { users }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
