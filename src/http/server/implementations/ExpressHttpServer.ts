import express from "express";
import { Server } from "http";

import { BasicError, ErrorHandler } from "../../../core/errors";
import { HttpMethods } from "../../http";
import { HttpStatusCodes } from "../../http-status-codes";
import { HTTPRequest, HTTPResponse, IHttpServer } from "../http-server";

export class ExpressHttpServer implements IHttpServer {
    private server: Server | null = null;
    protected app: express.Express;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(readonly baseUrl = "", readonly errorHandler?: ErrorHandler<any>) {
        this.app = express();
        this.app.use(express.json());
    }

    register(method: HttpMethods, url: string, callback: <T = unknown>(req: HTTPRequest) => Promise<HTTPResponse<T>>): void {
        this.app[method](`${this.baseUrl}${url}`, async (req, res) => {
            try {
                const response = await callback(req);
                res.status(response.statusCode).json(response.output);
            } catch (error) {
                if (this.errorHandler) {
                    const err = await this.errorHandler.handleError(error as Error);
                    res.status(err.statusCode).json(err);
                } else {
                    res.status(HttpStatusCodes.StatusInternalServerError).json(error);
                }
            }
        });
    }

    listen(port: number, callback?: () => Promise<void> | void): void {
        this.app.listen(port, callback);
    }

    getServer(): Server {
        if (!this.server) throw new BasicError("Http Server not instantiated.", false);
        return this.server;
    }
}
