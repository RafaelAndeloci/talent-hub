import { UserDto } from '@talent-hub/shared';

export type RequestContext = {
    user?: UserDto;
    requestId: string;
};
