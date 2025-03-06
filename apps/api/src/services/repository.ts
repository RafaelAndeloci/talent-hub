import { DbParser, PagedResponse } from '@talent-hub/shared';
import { Model, ModelStatic, Order, Transaction, WhereOptions } from 'sequelize';

export abstract class Repository<
    TEntity extends { id: string },
    TModelAttr extends {},
    TModel extends Model<TModelAttr | any>,
> {
    protected constructor(
        private model: ModelStatic<TModel>,
        private parser: DbParser<TEntity, TModelAttr>,
    ) {}

    async findAll({
        limit,
        offset,
        sort,
        filter: where,
    }: {
        limit?: number;
        offset?: number;
        sort?: (keyof TEntity)[];
        filter?: WhereOptions<TModelAttr>;
    }): Promise<PagedResponse<TEntity>> {
        limit = limit ?? 10;
        offset = offset ?? 0;
        sort = sort || ['id'];
        where = where || {};

        const order = sort.map((s) => [s, 'asc']) as Order;

        const models = await this.model.findAll({
            limit,
            offset,
            order,
            where,
        });

        const count = await this.model.count({ where });

        const records = models.map((m) => this.parser.fromDb(m.toJSON()));
        return PagedResponse.create(limit, offset, count, records);
    }

    async findById(id: string): Promise<TEntity | null> {
        const modelInstance = await this.model.findByPk(id as any);
        if (!modelInstance) {
            return null;
        }

        const raw = modelInstance.toJSON();
        return this.parser.fromDb(raw);
    }

    async findUnique(where: WhereOptions<TModelAttr>): Promise<TEntity | null> {
        const modelInstance = await this.model.findOne({
            where,
        });
        if (!modelInstance) {
            return null;
        }

        const raw = modelInstance.toJSON();
        return this.parser.fromDb(raw);
    }

    async exists(where: WhereOptions<TModelAttr>): Promise<boolean> {
        const models = await this.model.findAll({ where });
        return models.length > 0;
    }

    async create({
        entity,
        transaction,
    }: {
        entity: TEntity;
        transaction?: Transaction;
    }): Promise<void> {
        await this.model.create(this.parser.toDb(entity) as any, {
            returning: false,
            ...(transaction ? { transaction } : {}),
        });
    }

    async update({
        entity,
        transaction,
    }: {
        entity: TEntity;
        transaction?: Transaction;
    }): Promise<void> {
        const modelAttr = this.parser.toDb(entity);
        const [rows] = await this.model.update(modelAttr, {
            where: <WhereOptions<TModelAttr>>{ id: entity.id as any },
            returning: true,
            ...(transaction ? { transaction } : {}),
        });

        if (!rows) {
            throw new Error('Failed to update entity');
        }
    }

    async deleteById({
        id,
        transaction,
    }: {
        id: string;
        transaction?: Transaction;
    }): Promise<void> {
        await this.model.destroy({
            where: <WhereOptions<TModelAttr>>{ id: id as any },
            ...(transaction ? { transaction } : {}),
        });
    }

    async delete({
        where,
        transaction,
    }: {
        where: WhereOptions<TModelAttr>;
        transaction?: Transaction;
    }): Promise<void> {
        await this.model.destroy({
            where,
            ...(transaction ? { transaction } : {}),
        });
    }
}
