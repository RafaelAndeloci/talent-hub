import { User } from '@prisma/client';

type UserModel = Omit<
  User,
  | 'hashedPassword'
  | 'passwordResetToken'
  | 'passwordResetTokenExpires'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
>;

export default UserModel;
