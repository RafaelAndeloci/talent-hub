import { z } from 'zod';
import Schema from '../utils/schema-builder';
import { SuggestionStatus } from '../types/suggestion-status';

export const SuggestionValidation = z.object({
    by: Schema.id(),
    at: Schema.moment(),
});

export const SuggestionSchema = z.object({
    by: Schema.id(),
    at: Schema.moment(),
    status: z.nativeEnum(SuggestionStatus),
    validation: SuggestionValidation.nullable(),
});

export type Suggestion = Omit<z.infer<typeof SuggestionSchema>, 'validation'> & {
    validation: SuggestionValidation | null;
};

export type SuggestionValidation = z.infer<typeof SuggestionValidation>;