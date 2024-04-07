import { BasicError } from "../../common";
import { HttpReasons, HttpStatusCodes } from "./HttpStatusCodes";

export class HttpError extends BasicError {
    constructor(private httpReason: HttpReasons, readonly error: BasicError) {
        super(error.message, true);
    }

    getStatusCode() {
        return HttpStatusCodes.getStatusCode(this.httpReason);
    }

    getReasonPhrase() {
        return HttpStatusCodes.getReasonPhrase(this.httpReason);
    }

    toJSON(): Record<string, unknown> {
        return this.error.toJSON();
    }
}
