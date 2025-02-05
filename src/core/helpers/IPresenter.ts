export interface IPresenter<TInput, TOutput> {
    present(input: TInput): TOutput;
}
