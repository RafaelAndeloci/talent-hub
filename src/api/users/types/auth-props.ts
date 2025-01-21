import { User } from '@prisma/client';

type AuthProps = Pick<User, 'email'> & {
  password: string;
};

export default AuthProps;
