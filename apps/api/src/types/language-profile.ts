import { Language, LanguageProficiency } from '@talent-hub/shared';

export interface LanguageProfile {
    language: Language;
    writtenLevel: LanguageProficiency;
    spokenLevel: LanguageProficiency;
    readingLevel: LanguageProficiency;
    listeningLevel: LanguageProficiency;
}
