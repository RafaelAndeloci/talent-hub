import { Role } from '@talent-hub/shared';
import database from '.';
import { hasher } from '../../services/hasher';
import { logger } from '../../services/logging-service';
import { config } from '../environment';
import models from './models';

export const initDatabase = async ({
    sync,
    force,
    alter,
}: {
    sync: boolean;
    force: boolean;
    alter: boolean;
}) => {
    try {
        logger.info('connecting to database...');
        await database.authenticate();
        logger.info('database connected!');

        if (sync) {
            logger.info('syncing database...');
            await database.sync({
                force,
                alter,
            });
            logger.info('database synced!');
        }

        await models.User.upsert({
            id: config.sysAdmin.id,
            username: config.sysAdmin.username,
            email: config.sysAdmin.email,
            role: Role.SysAdmin,
            hashedPassword: await hasher.hash(config.sysAdmin.password),
            updatedAt: new Date(),
            createdAt: new Date(),
        });

        logger.info('database up!');
    } catch (error) {
        logger.error('database down!', error);

        logger.error('Exiting application...');
        process.exit(1);
    }
};
