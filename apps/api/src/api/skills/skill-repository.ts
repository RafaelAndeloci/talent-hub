import { Skill } from '@talent-hub/shared';
import { Repository } from '../../services/repository';
import { SkillModel, SkillModelAttr } from './skill-model';
import { SkillParser } from './skill-parser';

export class SkillRepository extends Repository<Skill, SkillModelAttr, SkillModel> {
    constructor() {
        super(SkillModel, SkillParser);
    }
}
