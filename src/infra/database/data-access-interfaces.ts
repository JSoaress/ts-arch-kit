import { UnitOfWork } from "./UnitOfWork";

export type Where = Record<string, unknown>;

export type FILTER_OPERATOR =
    | "exact"
    | "iexact"
    | "exclude"
    | "like"
    | "ilike"
    | "startWith"
    | "endWith"
    | "lt"
    | "lte"
    | "gt"
    | "gte"
    | "range"
    | "in"
    | "notIn"
    | "isNull";

export type PaginationParams = {
    limit: number;
    offset: number;
};

export type SortParams = {
    column: string;
    order: "asc" | "desc";
    nulls?: "first" | "last";
};

export type QueryOptions = {
    filter?: Where;
    pagination?: PaginationParams;
    sort?: SortParams[];
};

export type QueryOptionsWithoutPagination = Omit<QueryOptions, "pagination">;

export interface ISetUnitOfWork {
    setUnitOfWork(uow: UnitOfWork): void;
}

export interface ICount {
    count(filter?: Where): Promise<number>;
}

export interface IExists {
    exists(where?: Where): Promise<boolean>;
}

export interface IFind<T> {
    find(queryOptions?: QueryOptions): Promise<T[]>;
}

export interface IFindOne<T> {
    findOne(queryOptions?: QueryOptionsWithoutPagination): Promise<T | null>;
}
