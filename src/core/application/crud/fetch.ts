import { QueryOptions } from "../../../database";

export abstract class FetchUseCase<TModel, TInput extends { queryOptions?: QueryOptions }, TOutput, TFetchResult> {
    abstract fetch(input: TInput): Promise<TOutput>;
    protected abstract processBeforeReturn(records: TModel[]): Promise<TModel[] | TFetchResult[]>;
}
