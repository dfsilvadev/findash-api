import { Router } from "express";

import { routerAdapter } from "../adapters/router.adapter.js";
import { HealthCheckController } from "../controllers/health-check.controller.js";

export const healthRouter: Router = Router();
const healthCheckController = new HealthCheckController();

healthRouter.get("/", routerAdapter(healthCheckController));
