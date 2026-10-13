import { deleteUserValidator } from "../../validators/users/delete-user.validator.js";

import { toHttpResponse } from "../../errors/http-error-mapper.js";

import type { DeleteUserUseCase } from "../../../../application/use-cases/users/delete-user.use-case.js";
import type { Controller } from "../../../../domain/entities/controller.interface.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class DeleteUserController implements Controller {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = deleteUserValidator.parse(request.params);

      await this.deleteUserUseCase.execute({ userId });
      return {
        statusCode: 200,
        body: { userId, message: "User deleted successfully" }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
