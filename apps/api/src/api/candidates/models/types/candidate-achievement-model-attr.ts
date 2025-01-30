export interface CandidateAchievementModelAttr {
    id?: string;
    candidateId?: string;
    name: string;
    type: string;
    issuer: string;
    issueYear: number;
    issueMonth: number;
    expirationYear: number | null;
    expirationMonth: number | null;
    credentialId: string | null;
    credentialUrl: string | null;
    relatedSkills: string[];
}
