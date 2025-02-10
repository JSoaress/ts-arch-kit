/**
 * @module AbstractModel
 * @description
 * This abstract class serves as a base for domain entities.
 * It provides a system for tracking changes and managing primary keys.
 */

import { randomUUID } from "node:crypto";

import { BasicError } from "../errors";

/**
 * Type representing the primary key of an entity.
 * Can be either a string or a number.
 */
export type PrimaryKey = string | number;

/**
 * Definition of the minimum required properties for a model.
 */
export type AbstractModelProps = {
    id?: PrimaryKey;
};

/**
 * Generates a unique identifier for entities.
 * @returns {string} A randomly generated UUID.
 */
export function generateId(): string {
    return randomUUID();
}

/**
 * Abstract base class for domain models.
 * Manages primary key, state changes, and entity equality.
 *
 * @template Props - Type of model properties.
 */
export abstract class AbstractModel<Props extends AbstractModelProps> {
    /** Entity primary key. */
    readonly id: PrimaryKey;

    /** Model properties encapsulated within a Proxy to track changes. */
    protected props: Props;

    /** Indicates whether the entity is new (not yet persisted). */
    readonly isNew: boolean;

    /** List of properties that have been modified. */
    private _dirtyProperties: string[] = [];

    /** Function used to generate IDs when necessary. */
    protected idGenerator: () => PrimaryKey;

    /**
     * Model constructor.
     *
     * @param {Props} props - Initial model properties.
     * @param {boolean} [isNew=true] - Indicates if the entity is new.
     * @param {() => PrimaryKey} [idGenerator=generateId] - ID generator function.
     * @throws {BasicError} If attempting to instantiate a model without a primary key when `isNew` is false.
     */
    constructor(props: Props, isNew = true, idGenerator: () => PrimaryKey = generateId) {
        const handler = () => {
            const setPropertyDirty = (prop: string) => {
                if (!this.isNew) this._dirtyProperties.push(prop);
            };
            return {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                set(obj: Props, prop: string, value: any) {
                    // eslint-disable-next-line no-param-reassign
                    obj[prop as keyof Props] = value;
                    setPropertyDirty(prop);
                    return true;
                },
            };
        };
        if (!props.id && !isNew) {
            throw new BasicError(
                `Failed while manipulating "${this.constructor.name}" entity. Dirty Entities must have an ID`,
                false
            );
        }
        this.idGenerator = idGenerator;
        this.id = props.id ? props.id : this.idGenerator();
        this.isNew = isNew;
        this.props = new Proxy(props, handler());
    }

    /**
     * Checks if an object is an instance of `AbstractModel`.
     *
     * @template TEntity - Expected model type.
     * @param {unknown} obj - Object to check.
     * @returns {boolean} True if the object is an instance of `AbstractModel`.
     */
    static isModel<TEntity extends AbstractModelProps>(obj: unknown): obj is AbstractModel<TEntity> {
        return obj instanceof AbstractModel;
    }

    /**
     * Returns the list of modified properties.
     * @returns {string[]} List of names of properties that have been changed.
     */
    getDirtyProps(): string[] {
        return this._dirtyProperties;
    }

    /**
     * Checks if a specific property has been modified.
     * @param {string} prop - Property name to check.
     * @returns {boolean} True if the property has been modified.
     */
    checkDirtyProps(prop: keyof Props): boolean {
        return this._dirtyProperties.includes(String(prop));
    }

    /**
     * Checks if the entity has undergone any modifications.
     * @returns {boolean} True if there are modified properties.
     */
    isDirty(): boolean {
        return this.getDirtyProps().length > 0;
    }

    /**
     * Compares the current entity with another to check if they are equivalent.
     * @param {AbstractModel<Props> | undefined} entity - The entity to compare.
     * @returns {boolean} True if both entities have the same primary key.
     */
    equals(entity?: AbstractModel<Props>): boolean {
        if (!entity || !AbstractModel.isModel(entity)) return false;
        if (this === entity) return true;
        return this.id === entity.id;
    }
}
