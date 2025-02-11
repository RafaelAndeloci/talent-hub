import { Validation } from '@talent-hub/shared';
import _ from 'lodash';
import { SkillParser } from '../../types/skill-parser';

export const skillParser: SkillParser = {
    fromDatabase: (data) => ({
        id: data.id,
        name: data.name,
        status: data.status,
        categories: data.categories,
        type: data.type,
        tags: data.tags,
        relatedSkills: (data as any).relatedSkills,
        validation: data.validatedAt
            ? ({ by: data.validatedBy!, at: data.validatedAt! } as Validation)
            : null,
        suggestedBy: data.suggestedBy,
    }),

    toDatabase: (data) => ({
        id: data.id,
        name: data.name,
        status: data.status,
        categories: data.categories,
        type: data.type,
        tags: data.tags,
        suggestedBy: data.suggestedBy,
        relatedSkills: data.relatedSkills,
        validatedAt: data.validation?.at ?? null,
        validatedBy: data.validation?.by ?? null,
    }),

    toDto: (data) => _.omit(data, ['validation', 'suggestedBy']),
};
