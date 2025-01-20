import { z } from 'zod';
import FilterOperator from '../api/users/types/filter-operator';
import _ from 'lodash';

const schemaBuilder = {
  buildQuery({ sortingFields = ['id'], searchFields = ['id'] }) {
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
      sort: z
        .string()
        .transform(value => {
          const [field, order] = value.split(':');
          return {
            field,
            order,
          };
        })
        .refine(
          ({ field, order }) =>
            sortingFields?.includes(field) &&
            (order === 'asc' || order === 'desc'),
        )
        .default('id:asc')
        .optional(),
      filter: z
        .string()
        .transform(value => {
          const [field, operator, fieldValue] = value.split(':');

          return {
            field,
            operator,
            value: fieldValue,
          };
        })
        .refine(
          ({ field, operator, value }) =>
            Object.values(FilterOperator).includes(operator) &&
            searchFields?.includes(field) &&
            value?.length,
        )
        .optional(),
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
  }
};

export default schemaBuilder;
