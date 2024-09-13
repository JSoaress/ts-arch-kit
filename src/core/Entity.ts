import { EntityError } from "./errors/EntityError";
import { UniqueEntityID } from "./UniqueEntityID";
import { UniqueEntityIDGeneratorFactory } from "./UniqueEntityIDGeneratorFactory";

export type EntityProps = {
    id?: UniqueEntityID;
};

type ToJSON<T> = Partial<T> | Record<string, unknown>;

export abstract class Entity<TEntity extends EntityProps> {
    private _dirtyProperties: string[] = [];
    protected readonly _id: UniqueEntityID;
    protected props: TEntity;
    public readonly isNew: boolean;

    constructor(props: TEntity, isNew = true) {
        const handler = () => {
            const setPropertyDirty = (prop: string) => {
                if (!this.isNew) this._dirtyProperties.push(prop);
            };
            return {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                set(obj: TEntity, prop: string, value: any) {
                    // eslint-disable-next-line no-param-reassign
                    obj[prop as keyof TEntity] = value;
                    setPropertyDirty(prop);
                    return true;
                },
            };
        };
        if (!props.id && !isNew) throw new EntityError(this, "Dirty Entities must has an ID");
        const idGenerator = UniqueEntityIDGeneratorFactory.getInstance().getIdGeneratorFor(this);
        this._id = props.id ? props.id : idGenerator.nextID();
        this.isNew = isNew;
        this.props = new Proxy(props, handler());
    }

    static isEntity<TEntity extends EntityProps>(obj: unknown): obj is Entity<TEntity> {
        return obj instanceof Entity;
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    getId() {
        return this.id.toValue();
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

    equals(entity?: Entity<TEntity>): boolean {
        if (!entity || !Entity.isEntity(entity)) return false;
        if (this === entity) return true;
        return this._id.equals(entity._id);
    }

    toJSON(): ToJSON<TEntity> {
        return { ...this.props };
    }
}
