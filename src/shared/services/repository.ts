/* eslint-disable @typescript-eslint/no-explicit-any */
import { Attributes, Model, ModelStatic, Order, WhereOptions } from 'sequelize'
import { Entity } from '../types/base-types/entity'
import { FindAllArgs, Sort } from '../types/find-all-args'
import { PagedList } from '../types/paged-list'

type Args<
  TEntity extends Entity,
  KDatabaseModelAttributes extends Record<string, any>,
  UDatabaseModel extends Model<KDatabaseModelAttributes | any>,
> = {
  fromDatabase: (model: KDatabaseModelAttributes) => TEntity
  toDatabase: (model: TEntity) => KDatabaseModelAttributes
  model: ModelStatic<UDatabaseModel>
}

export const makeRepository = <
  TEntity extends Entity,
  KDatabaseModelAttributes extends Record<string, any>,
  UDatabaseModel extends Model<KDatabaseModelAttributes | any>,
>({
  fromDatabase,
  toDatabase,
  model,
}: Args<TEntity, KDatabaseModelAttributes, UDatabaseModel>) => {
  return {
    async findAll({
      limit,
      offset,
      sort,
      filter,
      where,
    }: FindAllArgs &
      Partial<{ where: WhereOptions<Attributes<UDatabaseModel>> }>): Promise<
      PagedList<TEntity>
    > {
      limit = limit || 10
      offset = offset || 0
      sort = sort || [{ field: 'id', order: 'asc' }]
      filter = filter || []
      where = where || {}

      filter.forEach(({ field, value, operator }) => {
        ;(where as any)[field] = {
          [operator]: value,
        }
      })

      const order = sort.map((s: Sort) => [s.field, s.order]) as Order

      const records = await model.findAll({
        limit,
        offset,
        order,
        where,
      })

      const count = await model.count({ where })

      return PagedList.create(
        limit,
        offset,
        count,
        records
          .map((r) => r.toJSON() as KDatabaseModelAttributes)
          .map(fromDatabase),
      )
    },

    async findById(id: string): Promise<TEntity | null> {
      const record = await model.findByPk(id as any)
      return record
        ? fromDatabase(record.toJSON() as KDatabaseModelAttributes)
        : null
    },

    async findUnique(
      where: WhereOptions<Attributes<UDatabaseModel>>,
    ): Promise<TEntity | null> {
      const record = await model.findOne({ where })
      return record
        ? fromDatabase(record.toJSON() as KDatabaseModelAttributes)
        : null
    },

    async exists(
      where: WhereOptions<Attributes<UDatabaseModel>>,
    ): Promise<boolean> {
      const record = await model.findAll({ where })
      return record.length > 0
    },

    async create(entity: TEntity): Promise<void> {
      const m = toDatabase(entity)
      await model.create(m as any, {
        include: { all: true },
      })
    },

    async update(entity: TEntity): Promise<void> {
      const model = toDatabase(entity)

      await model.update(model, { where: { id: entity.id } })
    },

    async delete(id: string): Promise<void> {
      await model.destroy({ where: { id: id as any } })
    },
  }
}
