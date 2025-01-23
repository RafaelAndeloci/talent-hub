import { UserDto } from './user-dto'

export type CreateUserDto = Omit<UserDto, 'profilePictureUrl' | 'id'> & {
  password: string
}
