import { User } from '@prisma/client';

type UserDtoProps = Omit<
  User,
  'hashedPassword' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export default UserDtoProps;
