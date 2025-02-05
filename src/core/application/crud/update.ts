import { PrimaryKey } from "../../models";

export abstract class UpdateUseCase<
    TModel,
    TInput extends { id: PrimaryKey },
    TValidationResult,
    TPreUpdateResult,
    TPostUpdateResult
> {
    abstract update(input: TInput): Promise<TModel>;
    protected abstract applyFiltersUpdate(input: TInput): Record<string, unknown>;
    protected abstract validateUpdate(original: TModel, input: TInput): Promise<TValidationResult>;
    protected abstract preUpdate(validatedModel: TModel, originalModel: TModel, input: TInput): Promise<TPreUpdateResult>;
    protected abstract postUpdate(savedModel: TModel, originalModel: TModel): Promise<TPostUpdateResult>;
}
