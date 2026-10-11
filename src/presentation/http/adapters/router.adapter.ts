import type { NextFunction, Request, Response } from "express";
import type { Controller } from "../../../domain/entities/controller.interface.js";
import type { HttpRequest } from "../types/http-types.js";

export function routerAdapter(controller: Controller) {
  return async (request: Request, response: Response, _next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: request.body as unknown,
      params: request.params,
      query: request.query,
      headers: request.headers
    };

    const httpResponse = await controller.handle(httpRequest);

    return response.status(httpResponse.statusCode).json(httpResponse.body);
  };
}
