import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./lib/logger.js";
import { prisma } from "./lib/prisma.js";

const app = createApp();

const server = app.listen(env.PORT, () => {
  logger.info("Server listening", { port: env.PORT, env: env.NODE_ENV });
});

function shutdown(signal: string): void {
  logger.info("Shutting down", { signal });
  server.close(() => {
    prisma
      .$disconnect()
      .then(() => process.exit(0))
      .catch((error: unknown) => {
        logger.error("Error during shutdown", { error: String(error) });
        process.exit(1);
      });
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
