import PagedList from '../../../types/paged-list';
import AuthProps from './auth-props';
import AuthTokenProps from './auth-token-props';
import CreateUserProps from './create-user-props';
import FindUsersProps from './find-users-props';
import UpdateUserProfilePictureProps from './update-user-profile-picture-props';
import UserDtoProps from './user-dto-props';

type UserBusiness = {
  findAll: (props: FindUsersProps) => Promise<PagedList<UserDtoProps>>;
  findById: (id: string) => Promise<UserDtoProps>;
  create: (props: CreateUserProps) => Promise<UserDtoProps>;
  auth: (props: AuthProps) => Promise<AuthTokenProps>;
  updateProfilePicture: (
    props: UpdateUserProfilePictureProps,
  ) => Promise<UserDtoProps>;
};

export default UserBusiness;
