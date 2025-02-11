import { Op } from 'sequelize';

import { UserModel } from './user-model';
import { userParser } from './user-parser';
import { makeRepository } from '../../services/repository';
import { User } from '@talent-hub/shared/types';
import { UserModelAttr } from '../../types/user-model-attr';

const makedRepository = makeRepository<User, UserModelAttr, UserModel>({
    model: UserModel,
    toDatabase: userParser.toDatabase,
    fromDatabase: userParser.fromDatabase,
});

export const userRepository = {
    ...makedRepository,
    findByEmailOrUserName(usernameOrEmail: string) {
        return makedRepository.findUnique({
            [Op.or]: {
                email: usernameOrEmail,
                username: usernameOrEmail,
            },
        });
    },
};
