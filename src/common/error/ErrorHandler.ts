import { BasicError } from "./BasicError";

export abstract class ErrorHandler {
    abstract handleError(err: Error): Promise<void>;

    isTrustedError(err: Error) {
        if (err instanceof BasicError) return err.isOperational;
        return false;
    }
}
