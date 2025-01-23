import { User } from "../entities/user";

export type UserDto = Omit<
  User,
  'hashedPassword' | 'passwordReset' | 'deletedAt' | 'createdAt' | 'updatedAt'
>
