import { SuggestionStatus } from '../../../enums/suggestion-status';

export type UpdateSkillStatusPayload = {
    status: (typeof SuggestionStatus)['approved'] | (typeof SuggestionStatus)['rejected'];
};
