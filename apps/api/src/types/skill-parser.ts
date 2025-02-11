import { Skill, SkillDto } from '@talent-hub/shared/types';
import { SkillModelAttr } from './skill-model-attr';

export type SkillParser = {
    fromDatabase: (data: SkillModelAttr) => Skill;
    toDatabase: (data: Skill) => SkillModelAttr;
    toDto: (data: Skill) => SkillDto;
};
