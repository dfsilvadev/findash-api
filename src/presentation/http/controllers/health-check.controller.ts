import { logger } from "../../../infrastructure/logger/logger.js";
import { prisma } from "../../../infrastructure/persistence/prisma/prisma.js";

import type { Controller } from "../../../domain/entities/controller.interface.js";
import type { HttpRequest, HttpResponse } from "../types/http-types.js";

export class HealthCheckController implements Controller {
  async handle(_request: HttpRequest): Promise<HttpResponse> {
    try {
      await prisma.$queryRaw`SELECT 1`;

      return {
        statusCode: 200,
        body: {
          status: "healthy",
          timestamp: new Date().toISOString(),
          database: "connected"
        }
      };
    } catch (error) {
      logger.error("[Health Check] Database connection failed:", { error });

      return {
        statusCode: 503,
        body: {
          status: "unhealthy",
          timestamp: new Date().toISOString(),
          database: "disconnected",
          error: "Database connection failed"
        }
      };
    }
  }
}
