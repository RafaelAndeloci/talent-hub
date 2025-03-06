/* eslint-disable @typescript-eslint/no-explicit-any */
import './models';
import { Logger } from '../../services/logging-service';
import { formatSql } from '../../utils/sql-formatter';
import database from '.';

const actionMap = Object.freeze({
    drop: async () => {
        Logger.info('dropping tables');
        await database.drop({
            cascade: true,
            logging: (sql) => Logger.info(formatSql(sql)),
        });
    },

    migrate: async () => {
        Logger.info('syncing database');
        await database.sync({
            force: false,
            alter: true,
            logging: (sql) => Logger.info(formatSql(sql)),
        });
    },

    truncate: async () => {
        Logger.info('truncating tables');
        await database.truncate({
            force: true,
            cascade: true,
            logging: (sql) => Logger.info(formatSql(sql)),
        });
    },
});

const performDatabaseAction = async () => {
    const type = process.argv[2];

    try {
        Logger.info('init database authentication');
        await database.authenticate({
            logging: (sql) => Logger.info(formatSql(sql)),
        });
        Logger.info('database authentication success');

        const handler = (actionMap as any)[type];
        if (!handler) {
            Logger.error('invalid action type');
            process.exit(1);
        }

        await handler();

        process.exit(0);
    } catch (e) {
        Logger.error(e);
        process.exit(1);
    }
};

performDatabaseAction();
