export const Role = Object.freeze({
    sysAdmin: 'sys_admin',
    companyRecruiter: 'company_recruiter',
    candidate: 'candidate',
    companyAdmin: 'company_admin',
});

export type Role = (typeof Role)[keyof typeof Role];
