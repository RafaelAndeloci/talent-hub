import { User } from './user';

export type UserDto = Omit<User, 'hashedPassword' | 'passwordReset' | 'emailConfirmation'>;
