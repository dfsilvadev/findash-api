import { AppError } from "./app.error.js";

export class CategoryIsArchivedError extends AppError {
  constructor(categoryId: string) {
    super(
      "The specified category is archived and cannot receive transactions.",
      422,
      "CATEGORY_ARCHIVED",
      {
        categoryId
      }
    );
  }
}
