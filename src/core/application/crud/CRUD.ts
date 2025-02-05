/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryOptions } from "../../../database";
import { PrimaryKey } from "../../models";

export abstract class CRUD<
    TModel,
    TInputCreate = any,
    TCreateResult = any,
    TPreCreateResult = any,
    TInputFetch extends { queryOptions?: QueryOptions } = any,
    TInputMutation extends { id: PrimaryKey } = any,
    TValidationResult = any,
    TPreUpdateResult = any,
    TPostUpdateResult = any,
    TOutputFetch = any,
    TFetchResult = TOutputFetch
> {
    abstract fetch(input: TInputFetch): Promise<TOutputFetch>;
    protected abstract processBeforeReturn(records: TModel[]): Promise<TModel[] | TFetchResult[]>;
    abstract create(input: TInputCreate): Promise<TCreateResult>;
    protected abstract validateCreate(input: TInputCreate): Promise<TValidationResult>;
    protected abstract beforeCreate(validatedModel: TModel): Promise<TPreCreateResult>;
    abstract update(input: TInputMutation): Promise<TModel>;
    protected abstract applyFiltersUpdate(input: TInputMutation): Record<string, unknown>;
    protected abstract validateUpdate(original: TModel, input: TInputMutation): Promise<TValidationResult>;
    protected abstract preUpdate(
        validatedModel: TModel,
        originalModel: TModel,
        input: TInputMutation
    ): Promise<TPreUpdateResult>;
    protected abstract postUpdate(savedModel: TModel, originalModel: TModel): Promise<TPostUpdateResult>;
    abstract delete(input: TInputMutation): Promise<void>;
    protected abstract applyFiltersDelete(input: TInputMutation): Record<string, unknown>;
}
