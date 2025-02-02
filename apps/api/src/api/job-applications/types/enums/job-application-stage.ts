export const JobApplicationStage = Object.freeze({
    /** triagem */
    screening: 'screening',

    /** entrevista técnica */
    technicalInterview: 'technical_interview',

    /** entrevista com gestor */
    managerInterview: 'manager_interview',

    /** proposta de emprego */
    offer: 'offer',

    /** entrega de documentos */
    documentDelivery: 'document_delivery',
});

export type JobApplicationStage = (typeof JobApplicationStage)[keyof typeof JobApplicationStage];
