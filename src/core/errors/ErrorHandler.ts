import { BasicError } from "./BasicError";

export abstract class ErrorHandler<T = void> {
    abstract handleError(err: Error): Promise<T>;

    isTrustedError(err: Error) {
        if (err instanceof BasicError) return err.isOperational;
        return false;
    }
}
