import { Router } from "express";

import { healthRouter } from "./health.routes.js";

const router = Router();

/**
 * API Routes
 *
 */
router.use("/health", healthRouter);

export { router };
