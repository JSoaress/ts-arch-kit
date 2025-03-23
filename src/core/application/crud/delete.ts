import { PrimaryKey } from "../../models";

export abstract class DeleteUseCase<TInput extends { id: PrimaryKey }, TOutput = void> {
    abstract delete(input: TInput): Promise<TOutput>;
    protected abstract applyFiltersDelete(input: TInput): Record<string, unknown>;
}
