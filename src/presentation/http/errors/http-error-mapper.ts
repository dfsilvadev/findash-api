import { ZodError } from "zod";

import { AppError } from "../../../domain/errors/app.error.js";
import { logger } from "../../../infrastructure/logger/logger.js";

import type { HttpResponse } from "../types/http-types.js";

export function toHttpResponse(error: unknown): HttpResponse {
  if (error instanceof ZodError) {
    return {
      statusCode: 400,
      body: {
        code: "VALIDATION_ERROR",
        message:
          "We couldn't process your request due to invalid data. Please check your information and try again",
        details: error.issues
      }
    };
  }

  if (error instanceof AppError) {
    return {
      statusCode: error.status,
      body: {
        code: error.code,
        message: error.expose
          ? error.message
          : "Something went wrong on our end. Please try again later or contact support if the problem persists",
        details: error.details ?? null
      }
    };
  }

  if (error instanceof Error)
    logger.error("[HTTP Error Mapper] Unknown error:", { error });

  return {
    statusCode: 500,
    body: {
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Something went wrong on our end. Please try again later or contact support if the problem persists",
      details: null
    }
  };
}
