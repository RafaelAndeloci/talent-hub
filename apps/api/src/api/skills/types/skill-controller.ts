import { RequestHandler } from 'express';
import { PagedList } from '../../../types/paged-list';
import { FindAllArgs } from '../../../types/find-all-args';
import { Id } from '../../../types/id';
import { SkillDto } from './skill-dto';
import { AuthContext } from '../../users/types/auth-context';
import { UpdateSkillPayload } from './update-skill-payload';
import { CreateSkillPayload } from './create-skill-payload';
import { UpdateSkillStatusPayload } from './update-skill-status-payload';

export type SkillController = {
    findAll: RequestHandler<void, PagedList<SkillDto>, void, FindAllArgs<SkillDto>, {}>;

    findById: RequestHandler<Id, SkillDto, void, void, {}>;

    create: RequestHandler<void, SkillDto, CreateSkillPayload, void, AuthContext>;

    update: RequestHandler<Id, SkillDto, UpdateSkillPayload, void, AuthContext>;

    remove: RequestHandler<Id, void, void, void, AuthContext>;

    updateStatus: RequestHandler<Id, SkillDto, UpdateSkillStatusPayload, void, AuthContext>;
};
