import Role from "../enums/role";

export default interface UserProps {
  id: string;
  email: string;
  hashedPassword: string;
  profilePictureUrl: string | null;
  role: Role;
}
