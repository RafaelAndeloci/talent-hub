export const PositionLevel = Object.freeze({
    Intern: 'intern',
    Junior: 'junior',
    MidLevel: 'mid_level',
    Senior: 'senior',
    Specialist: 'specialist',
    Coordinator: 'coordinator',
    Analyst: 'analyst',
    Consultant: 'consultant',
    Manager: 'manager',
    Director: 'director',
    Ceo: 'ceo',
});

export type PositionLevel = (typeof PositionLevel)[keyof typeof PositionLevel];
