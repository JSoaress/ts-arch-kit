import { IHttpServer } from "./http-server";

export abstract class HttpServerController {
    constructor(protected httpServer: IHttpServer) {}

    abstract setup(): Promise<void>;
}
