/* eslint-disable @typescript-eslint/no-explicit-any */

export type FilterOperators<T> = {
    $exact?: T;
    $iexact?: T;
    $exclude?: T;
    $like?: T;
    $ilike?: T;
    $startWith?: T;
    $endWith?: T;
    $lt?: number | Date;
    $lte?: number | Date;
    $gt?: number | Date;
    $gte?: number | Date;
    $range?: {
        start: number | Date;
        end: number | Date;
    };
    $in?: T[];
    $notIn?: T[];
    $isNull?: boolean;
};

export type Where<T = Record<string, unknown>> = {
    [K in keyof T]?: T[K] | Partial<FilterOperators<T[K]>>;
} & {
    [key: string]: unknown | Partial<FilterOperators<any>>;
};

export type PaginationParams = {
    limit: number;
    skip: number;
};

export type SortParams<T = Record<string, unknown>> = {
    column: keyof T;
    order: "asc" | "desc";
    nulls?: "first" | "last";
};

export type QueryOptions<T = Record<string, unknown>> = {
    filter?: Where<T>;
    pagination?: PaginationParams;
    sort?: SortParams<T>[];
};

export type QueryOptionsWithoutPagination<T = Record<string, unknown>> = Omit<QueryOptions<T>, "pagination">;
