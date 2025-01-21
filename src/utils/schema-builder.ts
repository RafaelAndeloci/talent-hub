import { z } from 'zod';
import FilterOperator from '../api/users/types/filter-operator';
import _ from 'lodash';
import Entity from '../types/entity';
import ApiError from '../types/api-error';
import { Filter, Sorting } from '../types/find-all-props';

type BuildQueryArgs<T extends Entity> = {
  sortingFields: (keyof T)[];
  searchFields: (keyof T)[];
};

const schemaBuilder = {
  buildQuery<T extends Entity>({
    sortingFields = ['id'],
    searchFields = ['id'],
  }: BuildQueryArgs<T>) {
    return z.object({
      limit: z
        .string()
        .transform(value => parseInt(value))
        .refine(value => value >= 0)
        .default('10')
        .optional(),
      offset: z
        .string()
        .transform(value => parseInt(value))
        .refine(value => value >= 0)
        .default('0')
        .optional(),
      sortings: z
        .string()
        .transform(value =>
          value.split(';').map(sort => {
            const [field, order] = sort.split(':');
            return {
              field,
              order,
            } as Sorting<T>;
          }),
        )
        .refine(value => {
          return value.every(({ field, order }) => {
            return (
              sortingFields?.includes(field as keyof T) &&
              (order === 'asc' || order === 'desc')
            );
          });
        })
        .optional()
        .default(''),
      filters: z
        .string()
        .transform(value => {
          const filters = value.split(';');
          return filters.map(filter => {
            const match = filter.match(/(\w+)\[(\w+)\]:(.+)/);

            if (!match) {
              ApiError.throwBadRequest('Invalid filter format');
            }

            const [, field, operator, value] = match!;

            return {
              field: field as keyof T,
              operator: operator as unknown as FilterOperator,
              value: value.split(','),
            } as Filter<T>;
          });
        })
        .refine(filters =>
          filters.every(
            ({ field, operator, value }) =>
              Object.values(FilterOperator).includes(operator) &&
              searchFields?.includes(field as keyof T) &&
              [FilterOperator.in, FilterOperator.notIn].includes(operator) &&
              Array.isArray(value),
          ),
        )
        .optional()
        .default(''),
    });
  },

  buildDate(validation = null) {
    const dateSchema = z
      .string()
      .transform(value => new Date(value).toISOString());
    return validation ? dateSchema.refine(validation) : dateSchema;
  },

  buildAddressSchema() {
    return z.object({
      street: z.string().min(3).max(255),
      number: z.string().min(1).max(10),
      complement: z.string().min(3).max(255).optional().nullable(),
      neighborhood: z.string().min(3).max(255),
      city: z.string().min(3).max(255),
      state: z.string().length(2),
      zipCode: z.string().length(8),
    });
  },
};

export default schemaBuilder;
