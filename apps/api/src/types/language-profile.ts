import { LanguageProficiency } from '../api/candidates/types/enums/language-proficiency';
import { Language } from '../enums/language';

export interface LanguageProfile {
    language: Language;
    writtenLevel: LanguageProficiency;
    spokenLevel: LanguageProficiency;
    readingLevel: LanguageProficiency;
    listeningLevel: LanguageProficiency;
}
