/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from "http";

import { HttpHeaders, HttpMethods } from "../http";

export interface HttpRequest<TBody = any> {
    params: Record<string, string>;
    query: Record<string, string>;
    body: TBody;
    headers: HttpHeaders;
    [key: string]: any;
}

export interface HttpResponse<TBody = any> {
    statusCode: number;
    message?: string;
    body?: TBody;
    headers?: HttpHeaders;
}

export interface IHttpServer {
    register(method: HttpMethods, url: string, callback: <T = any>(req: HttpRequest) => Promise<HttpResponse<T>>): void;
    listen(port: number, callback?: () => Promise<void> | void): Promise<void>;
    getServer(): Server;
}
