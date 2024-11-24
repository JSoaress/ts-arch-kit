import { ISetUnitOfWork } from "./data-access-interfaces";

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
