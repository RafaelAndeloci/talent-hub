import _ from 'lodash'
import { z } from 'zod'
import { Filter } from '../types/find-all-args'
import { Entity } from '../types/entity'
import {
  FilterOperator,
  FilterOperatorType,
  FilterOperatorValues,
} from '../enums/filter-operator'

export const buildAddressSchema = () => {
  return z.object({
    street: z.string().min(3).max(255),
    number: z.string().min(1).max(10),
    complement: z.string().min(3).max(255).optional().nullable(),
    neighborhood: z.string().min(3).max(255),
    city: z.string().min(3).max(255),
    uf: z.string().length(2),
    zipCode: z.string().length(8),
  })
}

export const buildDateSchema = (validation = null) => {
  const dateSchema = z
    .string()
    .transform((value) => new Date(value).toISOString())
  return validation ? dateSchema.refine(validation) : dateSchema
}

export const buildQuerySchema = <TResource extends Entity>({
  sortFields = ['id'],
  searchFields = [{ field: 'id', operators: [FilterOperator.eq] }],
}: {
  sortFields: (keyof TResource)[]
  searchFields: {
    field: keyof TResource
    operators: FilterOperatorType[]
  }[]
}) => {
  return z.object({
    limit: z
      .string()
      .transform((value) => parseInt(value))
      .refine((value) => value > 0, 'limit must be greater than 0')
      .default('10')
      .optional(),
    offset: z
      .string()
      .transform((value) => parseInt(value))
      .refine(
        (value) => value >= 0,
        'offset must be greater than or equal to 0',
      )
      .default('0')
      .optional(),
    sort: z
      .string()
      .transform((value) =>
        value.split(';').map((sort) => {
          const [field, order] = sort.split(':')
          return {
            field,
            order,
          }
        }),
      )
      .refine(
        (value) =>
          value.every(
            ({ field, order }) =>
              sortFields.includes(field as keyof TResource) &&
              (order === 'asc' || order === 'desc'),
          ),
        `sort must be in the format 'field:order'. Allowed: ${sortFields.join(', ')}`,
      )
      .optional()
      .default('id:asc'),
    filter: z
      .string()
      .transform((value) => {
        const filters = value.split(';').map((f) => f.trim())

        if (filters.length === 1 && filters[0] === '') {
          return []
        }

        return filters.map((f) => {
          const match = f.match(/(.+)\[(.+)\]:(.+)/)

          if (!match) {
            return {} as Filter<TResource>
          }

          const [, field, operator, value] = match!

          const filter = {
            field: field as string,
            operator: operator as FilterOperatorType,
            value: value as string | string[],
          }

          if (
            filter.operator === FilterOperator.in ||
            filter.operator === FilterOperator.notIn
          ) {
            filter.value = _.uniq(value.split(','))
          }

          return filter
        })
      })
      .refine(
        (filters) =>
          _.isArray(filters) &&
          filters.every(
            ({ field, operator }) =>
              FilterOperatorValues.includes(operator) &&
              searchFields.some(
                (sf) => sf.field === field && sf.operators.includes(operator),
              ),
          ),
        `filter must be in the format 'field[operator]:value'. Allowed: ${searchFields.map(({ field, operators }) => `${field as string}[${operators.join(', ')}]`).join(', ')}`,
      )
      .optional()
      .default(''),
  })
}
