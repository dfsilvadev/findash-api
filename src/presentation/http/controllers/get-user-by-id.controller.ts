import type { GetUserByIdUseCase } from "../../../application/use-cases/get-user-by-id.use-case.js";
import type { Controller } from "../../../domain/entities/controller.interface.js";
import { toHttpResponse } from "../errors/http-error-mapper.js";
import type { HttpRequest, HttpResponse } from "../types/http-types.js";
import { getUserByIdValidator } from "../validators/get-user-by-id.validator.js";

export class GetUserByIdController implements Controller {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const dto = getUserByIdValidator.parse(request.params);

      const userResponse = await this.getUserByIdUseCase.execute(dto.userId);
      return {
        statusCode: 200,
        body: { user: userResponse }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
