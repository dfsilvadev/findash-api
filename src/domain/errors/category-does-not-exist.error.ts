import { AppError } from "./app.error.js";

export class CategoryDoesNotExistError extends AppError {
  constructor(categoryId: string) {
    super("The specified category does not exist.", 404, "CATEGORY_NOT_FOUND", {
      categoryId
    });
  }
}
