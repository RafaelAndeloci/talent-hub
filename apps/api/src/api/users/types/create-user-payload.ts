import { UserDto } from './user-dto';

export type CreateUserPayload = Omit<UserDto, 'profilePictureUrl' | 'id'> & {
    password: string;
};
