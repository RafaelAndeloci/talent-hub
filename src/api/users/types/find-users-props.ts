import FindAllProps from '../../../types/find-all-props';
import UserDtoProps from './user-model';

type FindUsersProps = FindAllProps<UserDtoProps> & Pick<UserDtoProps, 'role'>;

export default FindUsersProps;
