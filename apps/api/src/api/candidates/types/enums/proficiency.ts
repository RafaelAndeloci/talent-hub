export const Proficiency = Object.freeze({
    Basic: 'basic',
    Intermediate: 'intermediate',
    Advanced: 'advanced',
});

export type Proficiency = (typeof Proficiency)[keyof typeof Proficiency];
