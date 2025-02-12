/* eslint-disable @typescript-eslint/no-explicit-any */
import { Id, FindAllArgs, PagedResponse, FilterOperator } from '@talent-hub/shared';
import { Attributes, Model, ModelStatic, Op, Order, WhereOptions } from 'sequelize';
import { ApiError } from '../types/api-error';
import { PagedResponseImp } from '../types/paged-response';

const operatorToSequelizeSymbol = {
    [FilterOperator.endsWith]: Op.endsWith,
    [FilterOperator.startsWith]: Op.startsWith,
    [FilterOperator.substring]: Op.substring,
    [FilterOperator.eq]: Op.eq,
    [FilterOperator.gt]: Op.gt,
    [FilterOperator.gte]: Op.gte,
    [FilterOperator.iLike]: Op.iLike,
    [FilterOperator.like]: Op.like,
    [FilterOperator.in]: Op.in,
    [FilterOperator.notIn]: Op.notIn,
    [FilterOperator.is]: Op.is,
    [FilterOperator.lt]: Op.lt,
    [FilterOperator.lte]: Op.lte,
    [FilterOperator.not]: Op.not,
};

const toSequelizeSymbol = (operator: FilterOperator) => operatorToSequelizeSymbol[operator];

export const makeRepository = <
    TEntity extends Id,
    TModelAttr extends Record<string, any>,
    TModel extends Model<TModelAttr | any>,
>({
    model,
    fromDatabase,
    toDatabase,
}: {
    model: ModelStatic<TModel>;
    toDatabase: (entity: TEntity) => TModelAttr;
    fromDatabase: (model: TModelAttr) => TEntity;
}) => {
    const findAll = async ({
        limit,
        offset,
        sort,
        filter,
        where,
    }: FindAllArgs<TEntity> & Partial<{ where?: WhereOptions<Attributes<TModel>> }>): Promise<
        PagedResponse<TEntity>
    > => {
        limit = limit ?? 10;
        offset = offset ?? 0;
        sort = sort || [{ field: 'id', order: 'asc' }];
        filter = filter || [];
        where = where || {};

        filter.forEach(({ field, value, operator }) => {
            (where as any)[field] = {
                [toSequelizeSymbol(operator)]: value,
            };
        });

        const order = sort.map((s) => [s.field, s.order.toUpperCase()]) as Order;

        const models = await model.findAll({
            limit,
            offset,
            order,
            where,
        });

        const count = await model.count({ where });

        const records = models.map((m) => fromDatabase(m.toJSON()));
        return PagedResponseImp.create(limit, offset, count, records);
    };

    const findById = async (id: string): Promise<TEntity> => {
        const modelInstance = await model.findByPk(id as any);
        if (!modelInstance) {
            ApiError.throwNotFound('resource not found');
            return null!;
        }

        const raw = modelInstance.toJSON();
        return fromDatabase(raw);
    };

    const findUnique = async (where: WhereOptions<Attributes<TModel>>): Promise<TEntity> => {
        const modelInstance = await model.findOne({
            where,
        });
        if (!modelInstance) {
            ApiError.throwNotFound('resource not found');
            return null!;
        }

        const raw = modelInstance.toJSON();
        return fromDatabase(raw);
    };

    const exists = async (where: WhereOptions<Attributes<TModel>>): Promise<boolean> => {
        const models = await model.findAll({ where });
        return models.length > 0;
    };

    const create = async (entity: Required<TEntity>): Promise<void> => {
        await model.create(toDatabase(entity) as any, {
            returning: true,
        });
    };

    const bulkCreate = async (entities: TEntity[]): Promise<void> => {
        const modelAttrs = entities.map(toDatabase) as any;
        await model.bulkCreate(modelAttrs);
    };

    const update = async (entity: TEntity): Promise<void> => {
        const modelAttr = toDatabase(entity) as any;
        const [rows] = await model.update(modelAttr, {
            where: { id: entity.id as any },
            returning: true,
        });

        if (!rows) {
            ApiError.throwInternalServerError('Failed to update entity');
        }
    };

    const deleteById = async (id: string): Promise<void> => {
        await model.destroy({ where: { id: id as any } });
    };

    return Object.freeze({
        findAll,
        findById,
        findUnique,
        exists,
        create,
        bulkCreate,
        update,
        deleteById,
    });
};
