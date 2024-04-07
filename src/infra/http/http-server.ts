import { HTTPRequest, HTTPResponse, HttpMethods } from "./http";

export interface IHttpServer {
    register(method: HttpMethods, url: string, callback: <T = unknown>(req: HTTPRequest) => Promise<HTTPResponse<T>>): void;
    listen(port: number): void;
}
