import User from './user';

type CreateUserProps = Pick<User, 'email' | 'role'> & {
  password: string;
};

export default CreateUserProps;
