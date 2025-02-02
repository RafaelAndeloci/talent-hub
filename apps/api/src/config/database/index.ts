/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sequelize, Transaction } from 'sequelize';
import * as uuid from 'uuid';

import { logger } from '../../services/logging-service';
import { config } from '../environment';
import { formatSql } from '../../utils/sql-formatter';

const {
    database: { database: name, port, host, user, password, logEnabled, pool },
} = config;

const logQuery = (query: string) => {
    logger.info(formatSql(query));
};

const database = new Sequelize(name, user, password, {
    host,
    port,
    dialect: 'postgres',
    logging: logEnabled ? logQuery : false,
    timezone: '-03:00',
    pool: {
        min: pool.min,
        max: pool.max,
        idle: 10000,
        acquire: 30000,
    },
    transactionType: Transaction.TYPES.DEFERRED,
    benchmark: true,
    define: {
        underscored: true,
    },
    hooks: {
        beforeCreate: (_i, opt) => {
            opt.returning = false;
        },
        beforeUpdate: (_i, opt) => {
            opt.returning = false;
        },
        beforeBulkCreate: (_i, opt) => {
            opt.returning = false;
        },
        beforeBulkUpdate: (opt) => {
            opt.returning = false;
        },
        beforeFind: (opt) => {
            opt.include = [{ all: true }];
        },
    },
});

(database as any).dialect.queryGenerator.generateTransactionId = function () {
    return `talenthub_api_${uuid.v4()}`.replace(/-/g, '');
};

export default database;
