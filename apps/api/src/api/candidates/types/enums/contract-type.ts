export const ContractType = Object.freeze({
    Clt: 'clt',
    Pj: 'pj',
    Other: 'other',
});

export type ContractType = (typeof ContractType)[keyof typeof ContractType];
