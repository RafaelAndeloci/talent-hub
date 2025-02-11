import { PagedResponse } from './paged-response';
import { UserDto } from './user-dto';

export type FindAllUsersDto = PagedResponse<UserDto>;
