import { Language } from '../../../../enums/language';
import { LanguageProficiency } from '../../types/enums/language-proficiency';

export interface CandidateLanguageModelAttr {
    id?: string;
    candidateId?: string;
    language: Language;
    writtenLevel: LanguageProficiency;
    spokenLevel: LanguageProficiency;
    readingLevel: LanguageProficiency;
    listeningLevel: LanguageProficiency;
}
