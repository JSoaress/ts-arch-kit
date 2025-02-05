export type DatabaseFilterOperatorParams = {
    columnName: string;
    value: unknown;
    unaccent?: boolean;
};

export abstract class DatabaseFilter<T> {
    abstract exact(params: DatabaseFilterOperatorParams): T;
    abstract iexact(params: DatabaseFilterOperatorParams): T;
    abstract exclude(params: DatabaseFilterOperatorParams): T;
    abstract like(params: DatabaseFilterOperatorParams): T;
    abstract ilike(params: DatabaseFilterOperatorParams): T;
    abstract startWith(params: DatabaseFilterOperatorParams): T;
    abstract endWith(params: DatabaseFilterOperatorParams): T;
    abstract lt(params: DatabaseFilterOperatorParams): T;
    abstract lte(params: DatabaseFilterOperatorParams): T;
    abstract gt(params: DatabaseFilterOperatorParams): T;
    abstract gte(params: DatabaseFilterOperatorParams): T;
    abstract range(params: DatabaseFilterOperatorParams): T;
    abstract in(params: DatabaseFilterOperatorParams): T;
    abstract notIn(params: DatabaseFilterOperatorParams): T;
    abstract isNull(params: DatabaseFilterOperatorParams): T;
}
