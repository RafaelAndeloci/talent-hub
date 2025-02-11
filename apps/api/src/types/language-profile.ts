import { Language, LanguageProficiency } from '@talent-hub/shared/types';

export interface LanguageProfile {
    language: Language;
    writtenLevel: LanguageProficiency;
    spokenLevel: LanguageProficiency;
    readingLevel: LanguageProficiency;
    listeningLevel: LanguageProficiency;
}
