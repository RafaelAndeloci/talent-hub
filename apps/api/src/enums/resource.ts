export const Resource = Object.freeze({
    candidates: 'candidates',
    users: 'users',
    companies: 'companies',
    jobOpenings: 'job-openings',
    jobApplications: 'job-applications',
});

export const AllResources = Object.freeze(Object.values(Resource)) as Resource[];

export type Resource = (typeof Resource)[keyof typeof Resource];
