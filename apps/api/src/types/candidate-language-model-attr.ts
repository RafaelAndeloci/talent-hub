import { Language, LanguageProficiency } from '@talent-hub/shared';

export interface CandidateLanguageModelAttr {
    id?: string;
    candidateId?: string;
    language: Language;
    writtenLevel: LanguageProficiency;
    spokenLevel: LanguageProficiency;
    readingLevel: LanguageProficiency;
    listeningLevel: LanguageProficiency;
}
