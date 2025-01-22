import prisma from '../config/database';
import PagedList from '../types/paged-list';
import Repository from '../types/repository';
import { Prisma } from '@prisma/client';
import _ from 'lodash';

type BuildRepositoryArgs = {
  modelName: Prisma.ModelName;
  inclusions?: Record<string, boolean | any>;
  toUpdateTransform?: (data: any) => any;
  toCreateTransform?: (data: any) => any;
};

const buildFor = <T extends { id: string }>({
  modelName,
  inclusions = {},
  toUpdateTransform,
  toCreateTransform,
}: BuildRepositoryArgs): Repository<T> => {
  const model: any = prisma[modelName.toLowerCase() as keyof typeof prisma];
  const repository: Repository<T> = {
    async findAll(props = null) {
      const { limit, offset, sortings, filters, where } = props || {
        limit: 10,
        offset: 0,
        sortings: [],
        filters: [],
        where: {},
      };

      for (const filter of filters) {
        const { field, operator, value } = filter;
        const op: any = operator;

        (where as any)[field] = {
          ...((where as any)[field] || {}),
          [op]: value,
        };
      }

      const options = {
        take: limit,
        skip: offset,
        orderBy: sortings.map(s => ({ [s.field]: s.order })),
        where,
        include: inclusions,
      };

      const [records, total] = await Promise.all([
        model.findMany(options),
        model.count({ where }),
      ]);

      return PagedList.create(
        offset ?? 0,
        limit ?? 10,
        total ?? 0,
        records ?? [],
      );
    },

    async findById(id: string) {
      return (await model.findUnique({
        where: { id },
        include: inclusions,
      })) as T;
    },

    async findOne(where) {
      return (await model.findFirst({
        where,
        include: inclusions,
      })) as T;
    },

    async create(data) {
      const transformed = toCreateTransform
        ? toCreateTransform(_.cloneDeep(data))
        : data;

      return await model.create({
        include: inclusions,
        data: transformed,
      });
    },

    async update(data) {
      const transformed = toUpdateTransform
        ? toUpdateTransform(_.cloneDeep(data))
        : data;

      return await model.update({
        where: { id: data.id },
        data: transformed,
        include: inclusions,
      });
    },

    async remove(id) {
      return await model.delete({
        where: { id },
      });
    },

    async count(where = {}) {
      return await model.count({ where });
    },

    async exists(where = {}) {
      return (await repository.count(where)) > 0;
    },
  };

  return repository;
};

const repositoryFactory = {
  buildFor,
};

export default repositoryFactory;
