import { FilterOperator } from '../enums/filter-operator'

export type Filter<T> = {
  field: keyof T
  value: T[keyof T]
  operator: FilterOperator
}

export type Sort<T> = {
  field: keyof T
  order: 'asc' | 'desc'
}

export interface FindAllArgs<T> {
  limit?: number
  offset?: number
  sort: Sort<T>[]
  filter: Filter<T>[]
}
