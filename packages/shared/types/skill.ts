import { SkillCategory } from './skill-category';
import { SkillType } from './skill-type';
import { Id } from './id';
import { Validation } from './validation';
import { SuggestionStatus } from './suggestion-status';

/**
 * Habilitades são habilidades técnicas ou comportamentais que um candidato ou um perfil de vaga pode ter
 */
export interface Skill extends Id {
    /**
     * Nome da habilidade
     */
    name: string;
    /**
     * @description O status da habilidade se refere ao seu uso dentro do sistema
     * Habilidates sugeridas podem ser aprovadas ou rejeitadas. Somente habilidade aprovadas podem ser usadas
     * no cadastro de candidatos e de perfis de vaga. Caso uma habilidade seja rejeitada, ela não poderá ser
     * usada e o usuário que a sugeriu será notificado.
     * Habilidades que não existem podem ser sugeridas e precisam ser aprovadas para serem usadas.
     */
    status: SuggestionStatus;
    /**
     * @description A categoria da habilidade é usada para agrupar habilidades similares
     * @example Habilidades como 'JavaScript', 'Java' e 'Go' podem ser agrupadas na categoria 'Linguagens de Programação', 'Software, 'Framework' e etc
     */
    categories: SkillCategory[];

    /**
     * @description Define se é hard ou soft skill
     */
    type: SkillType;

    /**
     * Tags não são obrigatórias e são usadas para facilitar a busca de habilidades
     */
    tags: string[];

    /** Auto-relacionamento
     * @example JavaScript é relacionado a TypeScript, Node.js, React, Angular, Vue.js, etc
     * Útil para sugerir habilidades relacionadas ao usuário
     */
    relatedSkills: string[];

    /**
     * @description Aprovação ou rejeição da habilidade
     */
    validation: Validation | null;

    suggestedBy: string | null;
}
