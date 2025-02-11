export const Proficiency = Object.freeze({
    Basic: 'basic',
    Intermediate: 'intermediate',
    Advanced: 'advanced',
    Expert: 'expert',
});

export type Proficiency = (typeof Proficiency)[keyof typeof Proficiency];
