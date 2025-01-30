import { Op } from 'sequelize';

import { UserModel, UserModelAttr } from './user-model';
import { userParser } from './user-parser';
import { User } from './types/user';
import { makeRepository } from '../../services/repository';

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
