export interface IToDomain<TEntity, TPersistence> {
    toDomain(persistence: TPersistence): TEntity;
}

export interface IToPersistence<TEntity, TPersistence> {
    toPersistence(entity: TEntity): TPersistence;
}

export interface IMapper<TEntity, TPersistence>
    extends IToDomain<TEntity, TPersistence>,
        IToPersistence<TEntity, TPersistence> {}
