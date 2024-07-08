import { BasicError } from "../../common";
import { HttpStatusCodes } from "./HttpStatusCodes";

export class HttpError extends BasicError {
    constructor(readonly statusCode: HttpStatusCodes, readonly error: BasicError) {
        super(error.message, true);
    }

    toJSON(): Record<string, unknown> {
        return this.error.toJSON();
    }
}
