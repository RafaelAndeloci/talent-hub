import { Op } from 'sequelize'

export const FilterOperator = Object.freeze({
  endsWith: 'endsWith',
  startsWith: 'startsWith',
  substring: 'substring',
  eq: 'eq',
  gt: 'gt',
  gte: 'gte',
  iLike: 'iLike',
  like: 'like',
  in: 'in',
  notIn: 'notIn',
  is: 'is',
  lt: 'lt',
  lte: 'lte',
  not: 'not',
})

export type FilterOperatorType = keyof typeof FilterOperator

export const FilterOperatorValues = Object.freeze(Object.values(FilterOperator))

const operatorToSequelizeSymbol = {
  [FilterOperator.endsWith]: Op.endsWith,
  [FilterOperator.startsWith]: Op.startsWith,
  [FilterOperator.substring]: Op.substring,
  [FilterOperator.eq]: Op.eq,
  [FilterOperator.gt]: Op.gt,
  [FilterOperator.gte]: Op.gte,
  [FilterOperator.iLike]: Op.iLike,
  [FilterOperator.like]: Op.like,
  [FilterOperator.in]: Op.in,
  [FilterOperator.notIn]: Op.notIn,
  [FilterOperator.is]: Op.is,
  [FilterOperator.lt]: Op.lt,
  [FilterOperator.lte]: Op.lte,
  [FilterOperator.not]: Op.not,
}

export const toSequelizeSymbol = (operator: keyof typeof FilterOperator) =>
  operatorToSequelizeSymbol[operator]
