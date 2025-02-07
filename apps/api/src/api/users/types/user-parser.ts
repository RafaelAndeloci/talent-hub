import { Role } from './enums/role';
import { User } from './user';
import { UserDto } from './user-dto';
import { UserModelAttr } from './user-model-attr';

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
