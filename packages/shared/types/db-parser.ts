export type DbParser<TEntity extends { id: string }, TModel> = {
    fromDb: (model: TModel) => TEntity;
    toDb: (entity: TEntity) => TModel;
};