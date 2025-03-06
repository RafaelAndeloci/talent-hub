/**
 * Enumerador de tipos de emprego
 */
export enum EmploymentType {
    /** Período integral
     *  Full-time é um termo que descreve um empregado que trabalha o número de horas padrão em uma empresa.
     * Normalmente, é de 40 horas por semana em regime CLT.
     */
    FullTime = 'full_time',

    /** Meio período */
    PartTime = 'part_time',

    /** Estágio */
    Internship = 'internship',

    /** Temporário */
    Temporary = 'temporary',

    /** Contrato */
    Contract = 'contract',

    /** Freelancer */
    Volunteer = 'volunteer',
}