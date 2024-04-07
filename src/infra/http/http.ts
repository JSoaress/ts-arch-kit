/* eslint-disable @typescript-eslint/no-explicit-any */

export type HttpMethods = "get" | "post" | "put" | "patch" | "delete" | "head" | "options";

type HTTPHeaders = {
    [key: string]: string | string[] | undefined;
};

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
