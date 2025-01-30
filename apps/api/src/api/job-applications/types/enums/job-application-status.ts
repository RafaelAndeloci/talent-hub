export const JobApplicationStatus = Object.freeze({
    // aplicação realizada
    applied: 'applied',

    // aplicação rejeitada
    rejected: 'rejected',

    // aplicação finaliza com contratação
    hired: 'hired',

    // aplicação finaliza sem contratação
    notHired: 'not_hired',

    // candidato desistiu da aplicação
    withdrew: 'withdrew',
});

export type JobApplicationStatus = (typeof JobApplicationStatus)[keyof typeof JobApplicationStatus];
