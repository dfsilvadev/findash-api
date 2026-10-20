import { Router } from "express";

import { categoryRouter } from "./category.routes.js";
import { healthRouter } from "./health.routes.js";
import { transactionRouter } from "./transaction.routes.js";
import { userRouter } from "./user.routes.js";

const router = Router();

/**
 * API Routes
 *
 */
router.use("/health", healthRouter);
router.use("/users", userRouter);
router.use("/transactions", transactionRouter);
router.use("/categories", categoryRouter);
export { router };
