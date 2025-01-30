export const JobApplicationStage = Object.freeze({
    // triagem
    screening: 'screening',

    // processo pós-triagem
    postScreening: 'post_screening',

    // entrevista
    interview: 'interview',

    // entrega de documentos, fase burocrática
    documentDelivery: 'document_delivery',
});

export type JobApplicationStage = (typeof JobApplicationStage)[keyof typeof JobApplicationStage];
