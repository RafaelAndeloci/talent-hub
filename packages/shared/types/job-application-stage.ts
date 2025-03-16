export enum JobApplicationStage {
    /** candidatura, mas não foi aprovada para a próxima etapa */
    applied = 'applied',

    /** triagem */
    screening = 'screening',

    /** entrevista técnica */
    technicalInterview = 'technical_interview',

    /** entrevista com gestor */
    managerInterview = 'manager_interview',

    /** proposta de emprego */
    offer = 'offer',

    /** entrega de documentos */
    documentDelivery = 'document_delivery',
}
