export enum Resource {
    Candidates = 'candidates',
    Users = 'users',
    Companies = 'companies',
    JobOpenings = 'job-openings',
    JobApplications = 'job-applications',
    Skills = 'skills'
}

export const AllResources = Object.freeze(Object.values(Resource)) as Resource[];
