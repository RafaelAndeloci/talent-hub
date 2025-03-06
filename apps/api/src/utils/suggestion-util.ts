import { SuggestionStatus, UserDto } from '@talent-hub/shared';
import { SuggestionSchema } from '@talent-hub/shared/schemas/suggestion';
import Role from '@talent-hub/shared/types/role';
import moment from 'moment';
import { PlainSuggestion } from '../types/plain-suggestion';

export const makeSuggestionForUser = (user: UserDto): Suggestion => ({
    status: user.role === Role.SysAdmin ? SuggestionStatus.Approved : SuggestionStatus.Pending,
    by: user.id,
    at: moment(),
    validation: user.role === Role.SysAdmin ? { by: user.id, at: moment() } : null,
});

export const plainSuggestion = (suggestion: Suggestion): PlainSuggestion => ({
    status: suggestion.status,
    suggestedAt: suggestion.at,
    suggestedBy: suggestion.by,
    validatedAt: suggestion.validation?.at ?? null,
    validatedBy: suggestion.validation?.by ?? null,
});

export const fromPlainSuggestion = (plainSuggestion: PlainSuggestion): Suggestion => ({
    status: plainSuggestion.status,
    by: plainSuggestion.suggestedBy,
    at: plainSuggestion.suggestedAt,
    validation:
        plainSuggestion.validatedBy && plainSuggestion.validatedAt
            ? { by: plainSuggestion.validatedBy, at: plainSuggestion.validatedAt }
            : null,
});
