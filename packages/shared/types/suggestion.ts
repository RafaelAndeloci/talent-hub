import { Moment } from 'moment';
import { SuggestionStatus } from './suggestion-status';

export interface SuggestionValidation {
    at: Moment;
    by: string;
}

export interface Suggestion {
    status: SuggestionStatus;
    by: string | null;
    validation: SuggestionValidation | null;
}
