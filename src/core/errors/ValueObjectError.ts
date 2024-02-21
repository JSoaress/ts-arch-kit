import { BasicError } from "../../common";

export class ValueObjectError extends BasicError {
    constructor(valueObject: string, private error?: string) {
        super(`Failed while building "${valueObject}" object.`, true);
    }

    toJSON(): Record<string, unknown> {
        const { error } = this;
        return { ...super.toJSON(), error };
    }
}
