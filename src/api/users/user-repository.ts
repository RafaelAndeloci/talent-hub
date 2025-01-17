import { User } from '@prisma/client';
import repositoryFactory from '../../services/repository-factory';

const userRepository = repositoryFactory.buildFor<User>('User');
export default userRepository;
