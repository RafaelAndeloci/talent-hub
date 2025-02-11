import { Language } from './language';
import { LanguageProficiency } from './language-proficiency';

export interface LanguageProfile {
    language: Language;
    writtenLevel: LanguageProficiency;
    spokenLevel: LanguageProficiency;
    readingLevel: LanguageProficiency;
    listeningLevel: LanguageProficiency;
}
