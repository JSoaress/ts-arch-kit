export type HttpMethods = "get" | "post" | "put" | "patch" | "delete" | "head" | "options";

export type HttpHeaders = {
    [key: string]: string | string[] | undefined;
};
