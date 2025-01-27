import { format } from 'sql-formatter'

export const formatSql = (sql: string) => {
  return format(sql, {
    tabWidth: 2,
    language: 'postgresql',
    keywordCase: 'upper',
    linesBetweenQueries: 2,
  })
}
