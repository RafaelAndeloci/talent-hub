import { UserModelAttr } from '../user-model';
import { Role } from './enums/role';
import { User } from './user';
import { UserDto } from './user-dto';

export type UserParser = {
    fromDatabase: (model: UserModelAttr) => User;

    toDatabase: (user: User) => UserModelAttr;

    newInstance: (args: {
        username: string;
        email: string;
        hashedPassword: string;
        role: Role;
        emailConfirmationToken: string;
    }) => User;

    toDto: (args: { user: User }) => UserDto;
};
