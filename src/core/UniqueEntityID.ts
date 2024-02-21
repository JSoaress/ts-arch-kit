/* eslint-disable max-classes-per-file */
import { BasicError } from "../common";
import { Identifier } from "./Identifier";

export class UniqueEntityIDError extends BasicError {
    constructor(message: string) {
        super(message, true);
    }
}

export class UniqueEntityID extends Identifier<string | number> {
    constructor(id: string | number) {
        if (id === null || id === undefined) throw new UniqueEntityIDError("UniqueEntityID must have a non null value");
        super(id);
    }
}

export interface IUniqueEntityIDGenerator {
    nextID(): UniqueEntityID;
}
