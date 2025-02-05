export abstract class CreateUseCase<TModel, TInput, TValidationResult, TCreateResult, TPreCreateResult> {
    abstract create(input: TInput): Promise<TCreateResult>;
    protected abstract validateCreate(input: TInput): Promise<TValidationResult>;
    protected abstract beforeCreate(validatedModel: TModel): Promise<TPreCreateResult>;
}
