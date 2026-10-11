import type {
  HttpRequest,
  HttpResponse
} from "../../presentation/http/types/http-types.js";

export interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>;
}
