import { newUUID, Skill, SkillDto, SkillPayload, UserDto } from '@talent-hub/shared';
import DbParser from '@talent-hub/shared/types/db-parser';
import _ from 'lodash';
import { SkillModelAttr } from './skill-model';
import {
    fromPlainSuggestion,
    makeSuggestionForUser,
    plainSuggestion,
} from '../../utils/suggestion-util';

type SkillParser = DbParser<Skill, SkillModelAttr> & {
    toDto: (data: Skill) => SkillDto;
    newInstance: (args: { payload: SkillPayload; user: UserDto }) => Skill;
};

export const SkillParser: SkillParser = {
    fromDb: (data) => ({
        id: data.id,
        name: data.name,
        categories: data.categories,
        type: data.type,
        tags: data.tags,
        suggestion: fromPlainSuggestion(data),
    }),

    toDb: (data) => ({
        id: data.id,
        name: data.name,
        categories: data.categories,
        type: data.type,
        tags: data.tags,
        ...plainSuggestion(data.suggestion),
    }),

    toDto: ({ suggestion: { status }, ...rest }) => ({ ...rest, status }),

    newInstance: ({ payload, user }) => ({
        id: newUUID(),
        ...payload,
        suggestion: makeSuggestionForUser(user),
    }),
};
