import UserModel from './user-model';

type User = Omit<
  UserModel,
  | 'hashedPassword'
  | 'passwordResetToken'
  | 'passwordResetTokenExpires'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
>;

export default User;
