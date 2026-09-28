import { Router } from "express";

import { logger } from "../../../infrastructure/logger/logger.js";
import { prisma } from "../../../infrastructure/persistence/prisma/prisma.js";

export const healthRouter: Router = Router();

healthRouter.get("/", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

healthRouter.get("/ready", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "ok" });
  } catch (error) {
    logger.warn("Readiness check failed", {
      error: error instanceof Error ? error.message : String(error)
    });
    res.status(503).json({ status: "unavailable" });
  }
});
