import { Skill } from './skill';

export type SkillModelAttr = Omit<Skill, 'validation' | 'relatedSkills'> & {
    validatedAt: Date | null;
    validatedBy: string | null;
};
