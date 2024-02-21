import { ICount, IExists, IFind, IFindOne, Where } from "../data-access-interfaces";

export type IDAOCount = ICount;

export type IDAOExists = IExists;

export type IDAOFind<T> = IFind<T>;

export type IDAOFindOne<T> = IFindOne<T>;

export interface IDAOFindById<T> {
    findById(id: string | number): Promise<T | null>;
}

export interface IDAOCreate<T> {
    create(data: T): Promise<T>;
}

export interface IDAOCreateBulk<T> {
    createBulk(data: T[]): Promise<T[]>;
}

export interface IDAOUpdate<T> {
    update(data: T, where: Where): Promise<T>;
}

export interface IDAODestroy {
    destroy(where?: Where): Promise<void>;
}

export interface IDAO<T>
    extends IDAOCount,
        IDAOExists,
        IDAOFind<T>,
        IDAOFindOne<T>,
        IDAOFindById<T>,
        IDAOCreate<T>,
        IDAOCreateBulk<T>,
        IDAOUpdate<T>,
        IDAODestroy {}
