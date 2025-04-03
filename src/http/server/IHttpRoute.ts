/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTTPRequest, HTTPResponse } from "./http-server";

export interface IHttpRoute<TResponse = any> {
    handle(request: HTTPRequest): Promise<HTTPResponse<TResponse>>;
}
