import { Router } from "express";

import { accountRouter } from "./account.routes.js";
import { categoryRouter } from "./category.routes.js";
import { healthRouter } from "./health.routes.js";
import { transactionRouter } from "./transaction.routes.js";

const router = Router();

/**
 * API Routes
 *
 */
router.use("/health", healthRouter);
router.use("/accounts", accountRouter);
router.use("/transactions", transactionRouter);
router.use("/categories", categoryRouter);
export { router };
