import FilterOperator from '../api/users/types/filter-operator';

export type Filter<T> = {
  field: keyof T;
  value: string | string[];
  operator: FilterOperator;
};

export type Sorting<T> = {
  field: keyof T;
  order: 'asc' | 'desc';
};

export default interface FindAllProps<T> {
  limit?: number;
  offset?: number;
  sortings: Sorting<T>[];
  filters: Filter<T>[];
}
