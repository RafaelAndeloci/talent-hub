import {
    PagedResponse,
    SkillDto,
    FindAllArgs,
    Id,
    CreateSkillPayload,
    AuthContext,
    UpdateSkillPayload,
    UpdateSkillStatusPayload,
} from '@talent-hub/shared';
import { RequestHandler } from 'express';

export type SkillController = {
    findAll: RequestHandler<void, PagedResponse<SkillDto>, void, FindAllArgs<SkillDto>, {}>;

    findById: RequestHandler<Id, SkillDto, void, void, {}>;

    create: RequestHandler<void, SkillDto, CreateSkillPayload, void, AuthContext>;

    update: RequestHandler<Id, SkillDto, UpdateSkillPayload, void, AuthContext>;

    remove: RequestHandler<Id, void, void, void, AuthContext>;

    updateStatus: RequestHandler<Id, SkillDto, UpdateSkillStatusPayload, void, AuthContext>;
};
