/**
 * Enumerador de tipos de emprego
 */
export const EmploymentType = Object.freeze({
    /** Período integral
     *  Full-time é um termo que descreve um empregado que trabalha o número de horas padrão em uma empresa.
     * Normalmente, é de 40 horas por semana em regime CLT.
     */
    fullTime: 'full_time',

    /** Meio período */
    partTime: 'part_time',

    /** Estágio */
    internship: 'internship',

    /** Temporário */
    temporary: 'temporary',

    /** Contrato */
    contract: 'contract',

    /** Freelancer */
    volunteer: 'volunteer',
});

export type EmploymentType = (typeof EmploymentType)[keyof typeof EmploymentType];
