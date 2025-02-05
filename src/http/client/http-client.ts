/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTTPHeaders, HttpMethods } from "../http";

export type HTTPClientOptions = {
    params?: Record<string, unknown>;
    body?: any;
    headers?: HTTPHeaders;
    responseType?: "arraybuffer" | "json";
    [key: string]: unknown;
};

type SuccessResponse<T> = {
    success: true;
    data: T;
};

type ErrorResponse<E> = {
    success: false;
    error: E;
};

export type HTTPClientResponse<T, E = Error> = (SuccessResponse<T> | ErrorResponse<E>) & {
    status: number;
    message: string;
};

export interface IHttpClient {
    request<TData, TError = Error>(
        method: HttpMethods,
        url: string,
        options?: HTTPClientOptions
    ): Promise<HTTPClientResponse<TData, TError>>;
}
