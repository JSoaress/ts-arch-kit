export class BasicError extends Error {
    constructor(message: string, readonly isOperational: boolean) {
        super();
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = this.constructor.name;
        this.message = message;
        Error.captureStackTrace(this);
    }

    toJSON(): Record<string, unknown> {
        const { message } = this;
        return { message };
    }
}
