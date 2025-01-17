import buildRepository from '../../shared/services/repository-factory';
import UserProps from './types/user-props';

const userRepository = buildRepository<UserProps>('user');
export default userRepository;
