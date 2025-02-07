import { Skill } from './skill';
import { SkillDto } from './skill-dto';
import { SkillModelAttr } from './skill-model-attr copy';

export type SkillParser = {
    fromDatabase: (data: SkillModelAttr) => Skill;
    toDatabase: (data: Skill) => SkillModelAttr;
    toDto: (data: Skill) => SkillDto;
};
