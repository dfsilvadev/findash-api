/* eslint-disable no-console */
import { env } from "../../config/env.js";

const levels = { debug: 10, info: 20, warn: 30, error: 40 } as const;
type Level = keyof typeof levels;
type Meta = Record<string, unknown>;

function log(level: Level, message: string, meta?: Meta): void {
  if (levels[level] < levels[env.LOG_LEVEL]) return;

  const line = JSON.stringify({
    level,
    time: new Date().toISOString(),
    message,
    ...meta
  });
  if (level === "error" || level === "warn") console.error(line);
  else console.log(line);
}

export const logger = {
  debug: (message: string, meta?: Meta) => log("debug", message, meta),
  info: (message: string, meta?: Meta) => log("info", message, meta),
  warn: (message: string, meta?: Meta) => log("warn", message, meta),
  error: (message: string, meta?: Meta) => log("error", message, meta)
};
