export type Filter = {
  field: string
  value: string | string[] | object
  operator: string
}

export type Sort = {
  field: string
  order: 'asc' | 'desc'
}

export interface FindAllArgs {
  limit?: number
  offset?: number
  sort: Sort[]
  filter: Filter[]
}
