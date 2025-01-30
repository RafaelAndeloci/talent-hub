export const SkillType = Object.freeze({
    Hard: 'hard',
    Soft: 'soft',
});

export type SkillType = (typeof SkillType)[keyof typeof SkillType];
