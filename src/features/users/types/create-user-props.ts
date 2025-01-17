import Role from "../enums/role";

export default interface CreateUserProps {
  email: string;
  password: string;
  role: Role;
}