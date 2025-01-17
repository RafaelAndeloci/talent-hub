import prisma from '../../config/database';
import FindAllProps from '../types/find-all-props';

const buildRepository = <T extends { id: string }>(
  modelName: Exclude<keyof typeof prisma, `$${string}` | symbol>,
) => {
  const model: any = prisma[modelName];

  const findAll = async ({
    limit = 9999999,
    offset = 0,
    orderBy = 'id',
    order = 'asc',
    where = {},
    search = undefined,
    searchBy = undefined,
  }: FindAllProps) => {
    if (search && searchBy) {
      where[searchBy] = {
        contains: search,
      };
    }

    const options = {
      take: limit,
      skip: offset,
      orderBy: {
        [orderBy]: order,
      },
      where,
    };

    const m = await model.findMany(options);
    const count = await model.count({ where });

    const pageCount = Math.ceil(count / limit);

    return {
      records: m,
      count,
      limit,
      offset,
      pageCount,
    };
  };

  const findById = async (id: string) => {
    const m = await model.findUnique({
      where: {
        id,
      },
    });

    return m as T;
  };

  const create = async (data: T) => {
    await model.create({
      data,
    });
  };

  const update = async (data: T) => {
    await model.update({
      where: {
        id: data.id,
      },
      data,
    });
  };

  const remove = async (id: string) => {
    await model.delete({
      where: {
        id,
      },
    });
  };

  const repository = {
    findAll,
    findById,
    create,
    update,
    remove,
  };

  return repository;
};

export default buildRepository;
