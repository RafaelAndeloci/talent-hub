import { SuggestionStatus } from '../common/suggestion-status';

export type UpdateSkillStatusPayload = {
    status: (typeof SuggestionStatus)['approved'] | (typeof SuggestionStatus)['rejected'];
};
