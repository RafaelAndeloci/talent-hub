import moment from 'moment';
import { Op, WhereOptions } from 'sequelize';
import { z } from 'zod';

type FilterOperator = keyof typeof Op;
const filterOperators = Object.keys(Op) as FilterOperator[];

export type QueryArgs<T> = {
    sort?: (keyof T)[];
    offset?: number;
    limit?: number;
    filter?: WhereOptions<T>;
};

type QueryFilter<T> = {
    field: keyof T;
    operators: FilterOperator[] | FilterOperator;
    builder?: (value: any) => WhereOptions;
};

class QueryStringBuilder<T> {
    private sortings: (keyof T)[] = [];
    private filters: QueryFilter<T>[] = [];
    private paginationEnabled = false;

    public sort(fields: (keyof T)[]) {
        this.sortings.push(...fields);
        return this as Omit<this, 'sort'>;
    }

    public filter(filters: QueryFilter<T>[]) {
        this.filters.push(...filters);
        return this as Omit<this, 'filter'>;
    }

    public paginate() {
        this.paginationEnabled = true;
        return this as Omit<this, 'paginate'>;
    }

    public build() {
        const schema = z.object({
            query: z.object({}),
        });

        if (this.paginationEnabled) {
            schema.shape.query.setKey(
                'offset',
                z
                    .string()
                    .transform((val) => parseInt(val, 10))
                    .nullish()
                    .default('0')
                    .refine((val) => val && val >= 0),
            );
            schema.shape.query.setKey(
                'limit',
                z
                    .string()
                    .transform((val) => parseInt(val, 10))
                    .nullish()
                    .default('999999')
                    .refine((val) => val && val >= 0),
            );
        }

        if (this.sortings.length) {
            schema.shape.query.setKey(
                'sort',
                z
                    .string()
                    .transform((val) => {
                        const sortings = val.split(',');

                        return sortings.map((sorting) => {
                            const [field, order] = sorting.split(':');
                            return { field, order };
                        });
                    })
                    .refine((val) =>
                        val.every(({ field, order }) => {
                            return (
                                this.sortings.includes(field as keyof T) &&
                                ['asc', 'desc'].includes(order)
                            );
                        }),
                    ),
            );
        }

        if (this.filters.length) {
            const allowedFields = this.filters.map(({ field }) => field).join('|');
            const allowedOperators = filterOperators.join('|');
            const pattern = new RegExp(`^(${allowedFields})\\[(${allowedOperators})\\]=(.+)$`);

            schema.shape.query.setKey(
                'filter',
                z
                    .string()
                    .transform((val) => {
                        return val.split(';').map((filter) => {
                            const match = filter.match(pattern);
                            if (!match) {
                                throw new Error('Invalid filter pattern');
                            }

                            const [_, field, operator, value] = match;

                            const meta = this.filters.find(({ field }) => field === field)!;
                            return { field, operator, value, meta };
                        });
                    })
                    .refine((val) =>
                        val.every(
                            ({ operator, meta }) =>
                                (meta &&
                                    Array.isArray(meta.operators) &&
                                    meta.operators.includes(operator as FilterOperator)) ||
                                operator === meta.operators,
                        ),
                    )
                    .transform((value) =>
                        value
                            .map(({ field, operator, value, meta }) => {
                                if (meta.builder) {
                                    return meta.builder(value);
                                }

                                if (operator === 'like' || operator === 'iLike') {
                                    return { [field]: { [Op.iLike]: `%${value}%` } };
                                }

                                if (operator === 'eq') {
                                    return { [field]: value };
                                }

                                return { [field]: { [Op[operator as FilterOperator]]: value } };
                            })
                            .reduce(
                                (acc, filter) => ({ ...acc, ...filter }),
                                {} as WhereOptions<T>,
                            ),
                    ),
            );
        }

        return schema;
    }
}

export default class Schema {
    public static query<T>() {
        return new QueryStringBuilder<T>();
    }

    public static moment() {
        return z.string().transform((value) => moment(value));
    }

    public static id() {
        return z.string().uuid();
    }

    public static paramsWithId() {
        return z.object({
            params: z.object({
                id: Schema.id(),
            }),
        });
    }

    public static file({
        allowedMimeTypes,
        maxFileSize,
    }: {
        allowedMimeTypes: string[];
        maxFileSize: number;
    }) {
        return z.object({
            file: z.object({
                mimetype: z.string().refine((val) => allowedMimeTypes.includes(val)),
                buffer: z.any().refine((val) => val.length <= maxFileSize),
            }),
        });
    }

    public static datePart() {
        return z
            .string()
            .regex(/^\d{2}\/\d{4}$/)
            .transform((value) => moment(value, 'MM/YYYY'))
            .nullable();
    }
}
