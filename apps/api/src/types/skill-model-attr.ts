import { Skill } from '@talent-hub/shared';

export type SkillModelAttr = Omit<Skill, 'validation' | 'relatedSkills'> & {
    validatedAt: Date | null;
    validatedBy: string | null;
};
