import FilterOperator from '../api/users/types/filter-operator';

export default interface FindAllProps<T> {
  limit?: number;
  offset?: number;
  sorting: {
    field: keyof T;
    order: 'asc' | 'desc';
  };
  filter: {
    field: keyof T;
    value: string;
    operator: FilterOperator;
  };
}
