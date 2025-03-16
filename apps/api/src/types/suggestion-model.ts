import { Suggestion } from '@talent-hub/shared/schemas/suggestion';
import { PlainSuggestion } from './plain-suggestion';

type SuggestionModel<T extends { id: string; suggestion: Suggestion }> = Omit<T, 'suggestion'> &
    PlainSuggestion;

export default SuggestionModel;
