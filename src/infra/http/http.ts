import { HTTP_CODES } from "./http-codes";

export type HttpMethods = "get" | "post" | "put" | "patch" | "delete" | "head" | "options";

type HTTPHeaders = {
    [key: string]: string | string[] | undefined;
};

export type HTTPRequest = {
    params: Record<string, unknown>;
    query: Record<string, unknown>;
    body: Record<string, unknown>;
    headers: HTTPHeaders;
};

export type HTTPResponse<TResponse> = {
    statusCode: HTTP_CODES | number;
    message?: string;
    body?: TResponse;
    headers?: HTTPHeaders;
};
