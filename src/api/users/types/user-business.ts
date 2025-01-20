import PagedList from '../../../types/paged-list';
import AuthProps from './auth-props';
import AuthTokenProps from './auth-token-props';
import CreateUserProps from './create-user-props';
import FindUsersProps from './find-users-props';
import UpdateUserProfilePictureProps from './update-user-profile-picture-props';
import UserModel from './user-model';

type UserBusiness = {
  findAll: (props: FindUsersProps) => Promise<PagedList<UserModel>>;
  findById: (id: string) => Promise<UserModel>;
  create: (props: CreateUserProps) => Promise<UserModel>;
  auth: (props: AuthProps) => Promise<AuthTokenProps>;
  updateProfilePicture: (
    props: UpdateUserProfilePictureProps,
  ) => Promise<UserModel>;
};

export default UserBusiness;
