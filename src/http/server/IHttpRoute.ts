/* eslint-disable @typescript-eslint/no-explicit-any */

import { HTTPResponse } from "./http-server";

export interface IHttpRoute<TData = any> {
    handle(req: Request, res: Response): Promise<HTTPResponse<TData>>;
}
