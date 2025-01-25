/* eslint-disable @typescript-eslint/no-explicit-any */
import { Attributes, Model, ModelStatic, Order, WhereOptions } from 'sequelize'
import { Entity } from '../types/entity'
import { FindAllArgs, Sort } from '../types/find-all-args'
import { PagedList } from '../types/paged-list'
import { ApiError } from '../types/api-error'

export const makeRepository = <
  TEntity extends Entity,
  TModelAttr extends Record<string, any>,
  TModel extends Model<TModelAttr | any>,
>({
  model,
  fromDatabase,
  toDatabase,
}: {
  model: ModelStatic<TModel>
  toDatabase: (entity: TEntity) => TModelAttr
  fromDatabase: (model: TModelAttr) => TEntity
}) => {
  const findAll = async ({
    limit,
    offset,
    sort,
    filter,
    where,
  }: FindAllArgs &
    Partial<{ where: WhereOptions<Attributes<TModel>> }>): Promise<
    PagedList<TEntity>
  > => {
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

    const models = await model.findAll({
      limit,
      offset,
      order,
      where,
    })

    const count = await model.count({ where })

    const records = models.map((m) => fromDatabase(m.toJSON()))
    return PagedList.create(limit, offset, count, records)
  }

  const findById = async (id: string): Promise<TEntity | null> => {
    const modelInstance = await model.findByPk(id as any, {
      include: [{ all: true }],
    })
    if (!modelInstance) {
      return null
    }

    const raw = modelInstance.toJSON()
    return fromDatabase(raw)
  }

  const findUnique = async (
    where: WhereOptions<Attributes<TModel>>,
  ): Promise<TEntity | null> => {
    const modelInstance = await model.findOne({
      where,
      include: [{ all: true }],
    })
    if (!modelInstance) {
      return null
    }

    const raw = modelInstance.toJSON()
    return fromDatabase(raw)
  }

  const exists = async (
    where: WhereOptions<Attributes<TModel>>,
  ): Promise<boolean> => {
    const models = await model.findAll({ where, include: [{ all: true }] })
    return models.length > 0
  }

  const create = async (entity: Required<TEntity>): Promise<void> => {
    await model.create(toDatabase(entity) as any, {
      include: [{ all: true }],
      returning: true,
    })
  }

  const update = async (entity: TEntity): Promise<void> => {
    const modelAttr = toDatabase(entity) as any
    const [rows] = await model.update(modelAttr, {
      where: { id: entity.id as any },
      returning: true,
    })

    if (!rows) {
      ApiError.throwInternalServerError('Failed to update entity')
    }
  }

  const deleteById = async (id: string): Promise<void> => {
    await model.destroy({ where: { id: id as any } })
  }

  const makedRepository = Object.freeze({
    findAll,
    findById,
    findUnique,
    exists,
    create,
    update,
    deleteById,
  })

  return makedRepository
}
