import {
    CandidateAchievementModel,
    CandidateEducationalExperienceModel,
    CandidateLanguageModel,
    CandidateModel,
    CandidateProfessionalExperienceModel,
    CandidateReferenceModel,
} from '../../api/candidates/models';
import { database } from '.';
import { UserModel } from '../../api/users/user-model';
import { JobOpeningModel } from '../../api/job-openings/job-opening-model';
import { JobApplicationModel } from '../../api/job-applications/job-application-model';
import { CompanyModel } from '../../api/companies/company-model';

export const models = {
    Candidates: {
        Self: CandidateModel,
        EducationalExperiences: CandidateEducationalExperienceModel,
        ProfessionalExperiences: CandidateProfessionalExperienceModel,
        Achievements: CandidateAchievementModel,
        References: CandidateReferenceModel,
        Languages: CandidateLanguageModel,
    },
    JobOpenings: {
        Self: JobOpeningModel,
    },
    JobApplications: {
        Self: JobApplicationModel,
    },
    Companies: {
        Self: CompanyModel,
    },
    Users: {
        Self: UserModel,
    },
    database,
};
