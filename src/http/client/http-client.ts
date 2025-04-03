/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpHeaders, HttpMethods } from "../http";

export type HttpClientOptions = {
    params?: Record<string, unknown>;
    body?: any;
    headers?: HttpHeaders;
    responseType?: "arraybuffer" | "blob" | "document" | "formdata" | "json" | "stream" | "text";
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

export type HttpClientResponse<T, E> = (SuccessResponse<T> | ErrorResponse<E>) & {
    status: number;
    message: string;
};

export interface IHttpClient {
    request<TData = any, TError = any>(
        method: HttpMethods,
        url: string,
        options?: HttpClientOptions
    ): Promise<HttpClientResponse<TData, TError>>;
}

export abstract class AbstractHttpClient implements IHttpClient {
    get<TData = any, TError = any>(url: string, options?: HttpClientOptions): Promise<HttpClientResponse<TData, TError>> {
        return this.request("get", url, options);
    }

    post<TData = any, TError = any>(url: string, options?: HttpClientOptions): Promise<HttpClientResponse<TData, TError>> {
        return this.request("post", url, options);
    }

    put<TData = any, TError = any>(url: string, options?: HttpClientOptions): Promise<HttpClientResponse<TData, TError>> {
        return this.request("put", url, options);
    }

    patch<TData = any, TError = any>(url: string, options?: HttpClientOptions): Promise<HttpClientResponse<TData, TError>> {
        return this.request("patch", url, options);
    }

    delete<TError = any>(url: string, options?: HttpClientOptions): Promise<HttpClientResponse<void, TError>> {
        return this.request("delete", url, options);
    }

    abstract request<TData = any, TError = any>(
        method: HttpMethods,
        url: string,
        options?: HttpClientOptions
    ): Promise<HttpClientResponse<TData, TError>>;
}
