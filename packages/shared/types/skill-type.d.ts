/**
 * Enumeração para tipos de habilidades
 * @property {string} Hard - Habilidades técnicas
 * @property {string} Soft - Habilidades comportamentais
 */
export const SkillType = Object.freeze({
    Hard: 'hard',
    Soft: 'soft',
});

export type SkillType = (typeof SkillType)[keyof typeof SkillType];
