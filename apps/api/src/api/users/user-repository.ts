import { Op } from 'sequelize';

import { User } from '@talent-hub/shared';

import { UserModel, UserModelAttr } from './user-model';
import { userParser } from './user-parser';
import { Repository } from '../../services/repository';

export default class UserRepository extends Repository<User, UserModelAttr, UserModel> {
    constructor() {
        super(UserModel, userParser);
    }

    async findBy({
        email,
        username,
    }: {
        email?: string;
        username?: string;
    }): Promise<User | null> {
        return this.findUnique({
            [Op.or]: {
                ...(email ? { email } : {}),
                ...(username ? { username } : {}),
            },
        });
    }
}
