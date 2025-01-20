import PagedList from '../../../types/paged-list';
import AuthProps from './auth-props';
import AuthTokenProps from './auth-token-props';
import CreateUserProps from './create-user-props';
import FindUsersProps from './find-users-props';
import UpdateUserProfilePictureProps from './update-user-profile-picture-props';
import User from './user';

type UserBusiness = {
  findAll: (props: FindUsersProps) => Promise<PagedList<User>>;
  findById: (id: string) => Promise<User>;
  create: (props: CreateUserProps) => Promise<User>;
  auth: (props: AuthProps) => Promise<AuthTokenProps>;
  updateProfilePicture: (
    props: UpdateUserProfilePictureProps,
  ) => Promise<User>;
};

export default UserBusiness;
