// eslint-disable-next-line max-classes-per-file
import { BasicError } from "../core/errors";

export interface ISetUnitOfWork {
    // eslint-disable-next-line no-use-before-define
    setUnitOfWork(uow: UnitOfWork): void;
}

export class DbTransactionNotPreparedError extends BasicError {
    constructor(message = "The database transaction was not correctly opened or prepared.") {
        super(message, false);
    }
}

export abstract class UnitOfWork<T = unknown> {
    prepare(...repositories: ISetUnitOfWork[]): void {
        repositories.forEach((repo) => {
            repo.setUnitOfWork(this);
        });
    }

    abstract start(): Promise<void>;

    abstract commit(): Promise<void>;

    abstract rollback(): Promise<void>;

    abstract dispose(): Promise<void>;

    abstract execute<TResponse>(callback: () => Promise<TResponse>): Promise<TResponse>;

    abstract getTransaction(): T;
}
