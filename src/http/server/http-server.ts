/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from "http";

import { HTTPHeaders, HttpMethods } from "../http";

export type HTTPRequest = {
    params: Record<string, unknown>;
    query: Record<string, unknown>;
    body: any;
    headers: HTTPHeaders;
};

export type HTTPResponse<TResponse = any> = {
    statusCode: number;
    message?: string;
    output?: TResponse;
    headers?: HTTPHeaders;
};

export interface IHttpServer {
    register(method: HttpMethods, url: string, callback: <T = unknown>(req: HTTPRequest) => Promise<HTTPResponse<T>>): void;
    listen(port: number, callback?: () => Promise<void> | void): void;
    getServer(): Server;
}
