import repositoryFactory from '../../services/repository-factory';
import UserModel from './types/user-model';

const userRepository = repositoryFactory.buildFor<UserModel>({
  modelName: 'User',
});

export default userRepository;
