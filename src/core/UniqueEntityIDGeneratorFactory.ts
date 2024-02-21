/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */
import { BasicError } from "../common";
import { Entity, EntityProps } from "./Entity";
import { IUniqueEntityIDGenerator } from "./UniqueEntityID";

type EntityIDFactories = {
    [entity: string]: IUniqueEntityIDGenerator;
};

export class UniqueEntityIDGeneratorFactoryError extends BasicError {
    constructor(message: string) {
        super(message, true);
    }
}

export class UniqueEntityIDGeneratorFactory {
    private static _instance: UniqueEntityIDGeneratorFactory;
    private _entityIDFactories: EntityIDFactories = {};

    private constructor() {
        // empty
    }

    public static getInstance() {
        if (!UniqueEntityIDGeneratorFactory._instance) {
            UniqueEntityIDGeneratorFactory._instance = new UniqueEntityIDGeneratorFactory();
        }
        return UniqueEntityIDGeneratorFactory._instance;
    }

    public initialize(factories: EntityIDFactories) {
        this._entityIDFactories = factories;
    }

    public getIdGeneratorFor<TEntity extends EntityProps>(entity: Entity<TEntity>): IUniqueEntityIDGenerator {
        const className = entity.constructor.name;
        if (!this._entityIDFactories || Object.keys(this._entityIDFactories).length === 0) {
            throw new UniqueEntityIDGeneratorFactoryError("Entity ID Factories were not initialized");
        }
        if (this._entityIDFactories[className]) return this._entityIDFactories[className];
        return this._entityIDFactories.default;
    }
}
