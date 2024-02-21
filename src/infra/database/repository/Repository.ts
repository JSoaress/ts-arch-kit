import { EntityProps, UniqueEntityID } from "../../../core";
import { ICount, IExists, IFind, IFindOne } from "../data-access-interfaces";

export type IRepoCount = ICount;

export type IRepoExists = IExists;

export type IRepoFind<TEntity extends EntityProps> = IFind<TEntity>;

export type IRepoFindOne<TEntity extends EntityProps> = IFindOne<TEntity>;

export interface IRepoFindById<TEntity extends EntityProps> {
    findById(id: UniqueEntityID): Promise<TEntity | null>;
}

export interface IRepoSave<TEntity extends EntityProps> {
    save(entity: TEntity): Promise<TEntity>;
}

export interface IRepoDestroy<TEntity extends EntityProps> {
    destroy(entity: TEntity): Promise<void>;
}

export interface IRepository<TEntity extends EntityProps>
    extends IRepoCount,
        IRepoExists,
        IRepoFind<TEntity>,
        IRepoFindOne<TEntity>,
        IRepoFindById<TEntity>,
        IRepoSave<TEntity>,
        IRepoDestroy<TEntity> {}
