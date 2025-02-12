export enum Resource {
    Candidates = 'candidates',
    Users = 'users',
    Companies = 'companies',
    JobOpenings = 'job-openings',
    JobApplications = 'job-applications',
    Skills = 'skills',
    AcademicInstitutions = "academic-institutions",
    Courses = "courses",
}

export const AllResources = Object.freeze(Object.values(Resource)) as Resource[];
