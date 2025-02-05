import { AbstractModelProps, PrimaryKey } from "../core/models";
import { QueryOptions, QueryOptionsWithoutPagination, Where } from "./helpers";

export interface ICount<W = Record<string, unknown>> {
    count(filter?: Where<W>): Promise<number>;
}

export interface IExists<W = Record<string, unknown>> {
    exists(where?: Where<W>): Promise<boolean>;
}

export interface IFind<T, Q = Record<string, unknown>> {
    find(queryOptions?: QueryOptions<Q>): Promise<T[]>;
}

export interface IFindOne<T, Q = Record<string, unknown>> {
    findOne(queryOptions?: QueryOptionsWithoutPagination<Q>): Promise<T | null>;
}

export interface IFindById<T> {
    findById(id: PrimaryKey): Promise<T | null>;
}

export interface ICreate<T> {
    create(data: T): Promise<T>;
}

export interface ICreateBulk<T> {
    createBulk(data: T[]): Promise<T[]>;
}

export interface IUpdate<T, W = Record<string, unknown>> {
    update(data: T, where: Where<W>): Promise<T>;
}

export interface ISave<T> {
    save(data: T): Promise<T>;
}

export interface IDestroy<W = Record<string, unknown>> {
    destroy(where?: Where<W>): Promise<void>;
}

export interface IQuerySet<T, W = Record<string, unknown>>
    extends ICount<W>,
        IExists<W>,
        IFind<T, W>,
        IFindOne<T, W>,
        IFindById<T>,
        ISave<T>,
        ICreate<T>,
        ICreateBulk<T>,
        IUpdate<T, W>,
        IDestroy<W> {}

export type IDAO<T, W = Record<string, unknown>> = Omit<IQuerySet<T, W>, "save">;

export interface IRepository<T extends AbstractModelProps, W = Record<string, unknown>>
    extends Omit<IQuerySet<T, W>, "create" | "createBulk" | "update" | "destroy"> {
    destroy(model: T): Promise<void>;
}
