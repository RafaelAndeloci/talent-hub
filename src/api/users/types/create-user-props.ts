import { User } from '@prisma/client';

type CreateUserProps = Pick<User, 'email' | 'role'> & {
  password: string;
};

export default CreateUserProps;