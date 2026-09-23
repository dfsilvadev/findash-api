import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../config/env.js";
import { PrismaClient } from "../generated/prisma/client.js";
import { logger } from "./logger.js";

const adapter = new PrismaPg(
  {
    connectionString: env.DATABASE_URL,
    max: env.DB_POOL_MAX,
    connectionTimeoutMillis: env.DB_CONNECTION_TIMEOUT_MS,
    idleTimeoutMillis: 10_000,
    statement_timeout: env.DB_STATEMENT_TIMEOUT_MS,
    idle_in_transaction_session_timeout: 30_000,
    application_name: "findash-api"
  },
  {
    onPoolError: (error) => {
      logger.error("Idle database client error", { error: error.message });
    }
  }
);

export const prisma = new PrismaClient({ adapter });
