/**
 * Enumeração para nível de senioridade de uma posição.
 */
export const PositionLevel = Object.freeze({
    /** Estágio */
    Intern: 'intern',

    /** Trainee */
    Trainee: 'trainee',

    /** Júnior */
    EntryLevel: 'entry_level',

    /** Pleno */
    MidLevel: 'mid_level',

    /** Sênior */
    Senior: 'senior',

    /** Especialista */
    Specialist: 'specialist',

    /** Coordenador */
    Coordinator: 'coordinator',

    /** Analista */
    Analyst: 'analyst',

    /** Consultor */
    Consultant: 'consultant',

    /** Gerente */
    Manager: 'manager',

    /** Diretor */
    Director: 'director',

    /** Vice-presidente */
    Ceo: 'ceo',
});

export type PositionLevel = (typeof PositionLevel)[keyof typeof PositionLevel];
