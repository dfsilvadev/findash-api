import { Router } from "express";

import { HealthCheckController } from "../controllers/health-check/health-check.controller.js";

import { routerAdapter } from "../adapters/router.adapter.js";

export const healthRouter: Router = Router();
const healthCheckController = new HealthCheckController();

healthRouter.get("/", routerAdapter(healthCheckController));
