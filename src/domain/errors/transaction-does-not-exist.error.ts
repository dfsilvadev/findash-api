import { AppError } from "./app.error.js";

export class TransactionDoesNotExistError extends AppError {
  constructor(transactionId: string) {
    super(
      "The specified transaction does not exist.",
      404,
      "TRANSACTION_NOT_FOUND",
      {
        transactionId
      }
    );
  }
}
