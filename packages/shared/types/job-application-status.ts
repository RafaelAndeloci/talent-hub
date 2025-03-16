export enum JobApplicationStatus {
    // aplicação realizada, mas ainda não avaliada
    waiting = 'waiting',

    // aplicação rejeitada
    rejected = 'rejected',

    // aplicação finaliza com contratação
    hired = 'hired',

    // aplicação finaliza sem contratação
    notHired = 'not_hired',

    // candidato desistiu da aplicação
    withdrew = 'withdrew',
}
