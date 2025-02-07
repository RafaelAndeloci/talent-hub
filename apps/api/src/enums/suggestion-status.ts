export const SuggestionStatus = Object.freeze({
    pending: 'pending',
    approved: 'approved',
    rejected: 'rejected',
});

export type SuggestionStatus = (typeof SuggestionStatus)[keyof typeof SuggestionStatus];
