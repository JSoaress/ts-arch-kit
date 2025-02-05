import { PrimaryKey } from "../../models";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class DeleteUseCase<TModel, TInput extends { id: PrimaryKey }> {
    abstract delete(input: TInput): Promise<void>;
    protected abstract applyFiltersDelete(input: TInput): Record<string, unknown>;
}
