import { Router } from "express";

import { healthRouter } from "./health.routes.js";
import { userRouter } from "./user.routes.js";

const router = Router();

/**
 * API Routes
 *
 */
router.use("/health", healthRouter);
router.use("/users", userRouter);
export { router };
