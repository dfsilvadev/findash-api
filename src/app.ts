import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response
} from "express";

import { router } from "./application/routes/router.js";
import { logger } from "./lib/logger.js";

export function createApp(): Express {
  const app = express();

  /**
   * Config Response
   * JSON
   */
  app.disable("x-powered-by");
  app.use(express.json({ limit: "100kb" }));

  /**
   * Routes
   */
  app.use(router);
  app.use((_req, res) => {
    res.status(404).json({ error: "Not Found" });
  });
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    logger.error("Unhandled error", {
      error: err instanceof Error ? err.message : String(err)
    });
    res.status(500).json({ error: "Internal Server Error" });
  });

  return app;
}
