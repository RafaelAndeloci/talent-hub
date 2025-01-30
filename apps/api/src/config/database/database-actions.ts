/* eslint-disable @typescript-eslint/no-explicit-any */
import './models';
import { logger } from '../../services/logging-service';
import { formatSql } from '../../utils/sql-formatter';
import { database } from '.';
import { seed } from './seed';

const actionMap = Object.freeze({
    drop: async() => {
        logger.info('dropping tables');
        await database.drop({
            cascade: true,
            logging: sql => logger.info(formatSql(sql)),
        });
    },

    migrate: async() => {
        logger.info('syncing database');
        await database.sync({
            force: false,
            alter: true,
            logging: sql => logger.info(formatSql(sql)),
        });
    },

    truncate: async() => {
        logger.info('truncating tables');
        await database.truncate({
            force: true,
            cascade: true,
            logging: sql => logger.info(formatSql(sql)),
        });
    },

    seed,
});

const performDatabaseAction = async() => {
    const type = process.argv[2];

    try {
        logger.info('init database authentication');
        await database.authenticate({
            logging: sql => logger.info(formatSql(sql)),
        });
        logger.info('database authentication success');

        const handler = (actionMap as any)[type];
        if (!handler) {
            logger.error('invalid action type');
            process.exit(1);
        }

        await handler();

        process.exit(0);
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
};

performDatabaseAction();
