import { AchievementType } from '@talent-hub/shared/types';

export interface CandidateAchievementModelAttr {
    id?: string;
    candidateId?: string;
    name: string;
    type: AchievementType;
    issuer: string;
    workload: number | null;
    issueDate: Date;
    expirationDate: Date | null;
    credentialId: string | null;
    credentialUrl: string | null;
    relatedSkills: string[];
}
