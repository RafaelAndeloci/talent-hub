import { SuggestionStatus } from "./suggestion-status";

export type UpdateSkillStatusPayload = {
    status: SuggestionStatus.Approved | SuggestionStatus.Rejected;
};
