export type HttpMethods = "get" | "post" | "put" | "patch" | "delete" | "head" | "options";

export type HTTPHeaders = {
    [key: string]: string | string[] | undefined;
};
