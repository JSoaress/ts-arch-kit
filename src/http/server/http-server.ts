/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from "http";

import { HttpHeaders, HttpMethods } from "../http";

export interface HttpRequest {
    params: Record<string, unknown>;
    query: Record<string, unknown>;
    body: any;
    headers: HttpHeaders;
    [key: string]: any;
}

export interface HttpResponse<TResponse = any> {
    statusCode: number;
    message?: string;
    body?: TResponse;
    headers?: HttpHeaders;
}

export interface IHttpServer {
    register(method: HttpMethods, url: string, callback: <T = any>(req: HttpRequest) => Promise<HttpResponse<T>>): void;
    listen(port: number, callback?: () => Promise<void> | void): Promise<void>;
    getServer(): Server;
}
