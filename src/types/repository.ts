import FindAllProps from './find-all-props';
import PagedList from './paged-list';
import WhereOptions from './where-options';


export default interface Repository<T extends { id: string }> {
  findAll: (
    props: FindAllProps<T> & { where?: WhereOptions<T> },
  ) => Promise<PagedList<T>>;

  findById: (id: string) => Promise<T>;

  findOne: (where: WhereOptions<T>) => Promise<T>;

  create: (data: T) => Promise<T>;

  update: (data: T) => Promise<T>;

  remove: (id: string) => Promise<void>;

  count: (where: WhereOptions<T>) => Promise<number>;
  
  exists: (where: WhereOptions<T>) => Promise<boolean>;
}
