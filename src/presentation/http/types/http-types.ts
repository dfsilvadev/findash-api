import type { IncomingHttpHeaders } from "node:http";

export interface HttpRequest<
  Tbody = unknown,
  TQuery = unknown,
  TParams = unknown
> {
  body: Tbody;
  query: TQuery;
  params: TParams;
  headers: IncomingHttpHeaders;
  metadata?: Record<string, unknown>;
}

export interface HttpMiddlewareRequest extends HttpResponse {
  headers?: Record<string, string | string[] | undefined>;
}

export interface HttpResponse<TBody = unknown> {
  statusCode: number;
  body: TBody | null;
}

export interface HttpMiddlewareResponse {
  data: Record<string, unknown> | null;
}
