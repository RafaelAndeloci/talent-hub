export const EmploymentRegime = Object.freeze({
    Clt: 'clt',
    Pj: 'pj',
    Other: 'other',
});

export type EmploymentRegime = (typeof EmploymentRegime)[keyof typeof EmploymentRegime];
