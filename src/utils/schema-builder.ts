import { z } from 'zod';
import FilterOperator from '../api/users/types/filter-operator';
import _ from 'lodash';
import { Filter } from '../types/find-all-props';

type BuildQueryArgs = {
  sortingFields: string[];
  searchFields: string[];
};

const schemaBuilder = {
  buildQuery({
    sortingFields = ['id'],
    searchFields = ['id'],
  }: BuildQueryArgs) {
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
            };
          }),
        )
        .refine(value => {
          return value.every(({ field, order }) => {
            return (
              sortingFields?.includes(field) &&
              (order === 'asc' || order === 'desc')
            );
          });
        })
        .optional()
        .default('id:asc'),
      filters: z
        .string()
        .transform(value => {
          const filters = value.split(';').map(f => f.trim());

          if (filters.length === 1 && filters[0] === '') {
            return [];
          }

          return filters.map(f => {
            const match = f.match(/(.+)\[(.+)\]:(.+)/);

            if (!match) {
              return {} as Filter;
            }

            const [, field, operator, value] = match!;

            const filter = {
              field: field as string,
              operator: operator as unknown as FilterOperator,
              value: value as string | string[],
            };

            if (
              filter.operator === FilterOperator.in ||
              filter.operator === FilterOperator.notIn
            ) {
              filter.value = _.uniq(value.split(','));
            }

            return filter;
          });
        })
        .refine(
          filters =>
            _.isArray(filters) &&
            filters.every(
              ({ field, operator }) =>
                Object.values(FilterOperator).includes(operator) &&
                searchFields?.includes(field),
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
