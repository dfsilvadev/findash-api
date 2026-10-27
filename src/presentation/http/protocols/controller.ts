import type { HttpRequest, HttpResponse } from "../types/http-types.js";

export interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>;
}
