import { format } from 'sql-formatter';

export const formatSql = (sql: string) =>
    format(sql, {
        tabWidth: 2,
        language: 'postgresql',
        keywordCase: 'upper',
        linesBetweenQueries: 2,
        dataTypeCase: 'lower',
    });
