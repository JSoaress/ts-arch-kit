import { randomUUID } from "node:crypto";

import { BasicError } from "../errors";

export type PrimaryKey = string | number;

export type AbstractModelProps = {
    pk?: PrimaryKey;
};

export function generateId() {
    return randomUUID();
}

export abstract class AbstractModel<Props extends AbstractModelProps> {
    readonly pk: PrimaryKey;
    protected props: Props;
    readonly isNew: boolean;
    private _dirtyProperties: string[] = [];
    protected idGenerator: () => PrimaryKey;

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
        if (!props.pk && !isNew) {
            const entityName = this.constructor.name;
            throw new BasicError(`Failed while manipulating "${entityName}" entity. Dirty Entities must has an ID`, false);
        }
        this.idGenerator = idGenerator;
        this.pk = props.pk ? props.pk : this.idGenerator();
        this.isNew = isNew;
        this.props = new Proxy(props, handler());
    }

    static isModel<TEntity extends AbstractModelProps>(obj: unknown): obj is AbstractModel<TEntity> {
        return obj instanceof AbstractModel;
    }

    getDirtyProps(): string[] {
        return this._dirtyProperties;
    }

    checkDirtyProps(prop: string) {
        return this._dirtyProperties.includes(prop);
    }

    isDirty(): boolean {
        return this.getDirtyProps().length > 0;
    }

    equals(entity?: AbstractModel<Props>): boolean {
        if (!entity || !AbstractModel.isModel(entity)) return false;
        if (this === entity) return true;
        return this.pk === entity.pk;
    }
}
