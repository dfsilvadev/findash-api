import { createCategoryValidator } from "../../validators/categories/create-category.validator.js";

import { toHttpResponse } from "../../errors/http-error-mapper.js";

import type { CreateCategoryUseCase } from "../../../../application/use-cases/categories/create-category.use-case.js";
import type { Controller } from "../../../../domain/entities/controller.interface.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class CreateCategoryController implements Controller {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const dto = createCategoryValidator.parse(request.body);
      await this.createCategoryUseCase.execute(dto);

      return {
        statusCode: 201,
        body: { message: "Category created successfully" }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
