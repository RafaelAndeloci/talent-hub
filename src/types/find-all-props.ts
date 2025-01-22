import FilterOperator from '../api/users/types/filter-operator';

export type Filter = {
  field: string;
  value: string | string[] | object;
  operator: FilterOperator;
};

export type Sorting = {
  field: string;
  order: 'asc' | 'desc';
};

export default interface FindAllProps<T> {
  limit?: number;
  offset?: number;
  sortings: Sorting[];
  filters: Filter[];
}
