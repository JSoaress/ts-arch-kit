import { BasicError } from "../core/errors";

export class HttpError extends BasicError {
    constructor(readonly statusCode: number, readonly error: BasicError) {
        super(error.message, error.isOperational);
    }

    toJSON(): Record<string, unknown> {
        return this.error.toJSON();
    }
}
