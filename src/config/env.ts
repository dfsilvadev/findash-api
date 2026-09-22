import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ quiet: true });

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  CORS_ORIGINS: z
    .string()
    .default(
      "http://localhost:3000,http://localhost:3002,http://localhost:5173"
    )
    .transform((str) => str.split(",").map((s) => s.trim()))
});

const _parsed = envSchema.safeParse(process.env);

if (!_parsed.success)
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(_parsed.error.format())}`
  );

export const env = _parsed.data;
export type Env = z.infer<typeof envSchema>;
