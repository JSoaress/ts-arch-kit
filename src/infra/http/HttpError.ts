import { BasicError } from "../../common";
import { HTTP_CODES } from "./http-codes";

export class HttpError extends BasicError {
    constructor(readonly statusCode: HTTP_CODES, readonly error: BasicError) {
        super(error.message, true);
    }

    toJSON(): Record<string, unknown> {
        return this.error.toJSON();
    }
}
