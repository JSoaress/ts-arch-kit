import { BasicError } from "../../common";
import { Entity, EntityProps } from "../Entity";

type Props = EntityProps;

export class EntityError extends BasicError {
    constructor(entity: Entity<Props>, private error?: string) {
        const entityName = entity.constructor.name;
        super(`Failed while manipulating "${entityName}" entity.`, true);
    }

    toJSON(): Record<string, unknown> {
        const { error } = this;
        return { ...super.toJSON(), error };
    }
}
