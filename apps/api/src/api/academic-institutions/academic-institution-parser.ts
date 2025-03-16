import {
    AcademicInstitution,
    AcademicInstitutionDto,
    AcademicInstitutionPayload,
    newUUID,
    UserDto,
} from '@talent-hub/shared';
import { DbParser } from '@talent-hub/shared/types/db-parser';
import { AcademicInstitutionModelAttr } from './academic-institution-model';
import {
    fromPlainSuggestion,
    makeSuggestionForUser,
    plainSuggestion,
} from '../../utils/suggestion-util';

type AcademicInstitutionParser = DbParser<AcademicInstitution, AcademicInstitutionModelAttr> & {
    newInstance: (args: {
        payload: AcademicInstitutionPayload;
        user: UserDto;
    }) => AcademicInstitution;
    toDto: (a: AcademicInstitution) => AcademicInstitutionDto;
};

export const AcademicInstitutionParser: AcademicInstitutionParser = {
    newInstance: ({ payload, user }) => ({
        id: newUUID(),
        ...payload,
        suggestion: makeSuggestionForUser(user),
    }),
    toDto: ({ suggestion, ...rest }) => ({ ...rest, status: suggestion.status }),
    toDb: (entity) => ({
        ...entity,
        ...plainSuggestion(entity.suggestion),
    }),
    fromDb: ({ suggestedAt, suggestedBy, status, validatedAt, validatedBy, ...rest }) => ({
        ...rest,
        suggestion: fromPlainSuggestion({
            suggestedAt,
            suggestedBy,
            status,
            validatedAt,
            validatedBy,
        }),
    }),
};
