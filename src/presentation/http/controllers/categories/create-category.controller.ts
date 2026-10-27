import { createCategorySchema } from "../../validators/categories/create-category.validator.js";

import { toHttpResponse } from "../../errors/http-error-mapper.js";

import type { CreateCategoryUseCase } from "../../../../application/use-cases/categories/create-category.use-case.js";
import type { Controller } from "../../protocols/controller.js";
import type { HttpRequest, HttpResponse } from "../../types/http-types.js";

export class CreateCategoryController implements Controller {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const schema = createCategorySchema.parse(request.body);
      await this.createCategoryUseCase.execute(schema);

      return {
        statusCode: 201,
        body: {
          code: "CATEGORY_CREATED",
          message: "Category created successfully"
        }
      };
    } catch (error) {
      return toHttpResponse(error);
    }
  }
}
