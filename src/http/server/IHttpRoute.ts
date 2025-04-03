/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequest, HttpResponse } from "./http-server";

export interface IHttpRoute<TResponse = any> {
    handle(request: HttpRequest): Promise<HttpResponse<TResponse>>;
}
