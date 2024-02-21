import { HTTPRequest, HttpMethods } from "./http";

export interface IHttpServer {
    on(method: HttpMethods, url: string, callback: (req: HTTPRequest) => Promise<unknown>): void;
    listen(port: number): void;
}
