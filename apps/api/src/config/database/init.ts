import { Role } from '@talent-hub/shared';
import database from '.';
import { hasher } from '../../services/hasher';
import { Logger } from '../../services/logging-service';
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
        Logger.info('connecting to database...');
        await database.authenticate();
        Logger.info('database connected!');

        if (sync) {
            Logger.info('syncing database...');
            await database.sync({
                force,
                alter,
            });
            Logger.info('database synced!');
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

        Logger.info('database up!');
    } catch (error) {
        Logger.error('database down!', error);

        Logger.error('Exiting application...');
        process.exit(1);
    }
};
