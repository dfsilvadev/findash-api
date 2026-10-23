import { AppError } from "./app.error.js";

export class CategoryTypeMismatchError extends AppError {
  constructor(
    categoryId: string,
    categoryType: string,
    transactionType: string
  ) {
    super(
      "The transaction type must match the category type.",
      422,
      "CATEGORY_TYPE_MISMATCH",
      {
        categoryId,
        categoryType,
        transactionType
      }
    );
  }
}
