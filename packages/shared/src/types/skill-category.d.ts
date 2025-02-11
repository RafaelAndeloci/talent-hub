export const SkillCategory = Object.freeze({
    /** Software */
    Software: 'software',

    /** Linguagem de Programação */
    ProgrammingLanguage: 'programming_language',

    /** Framework */
    Framework: 'framework',

    /** Banco de Dados */
    Database: 'database',

    /** Operações e Desenvolvimento */
    DevOps: 'devops',

    /** Nuvem */
    Cloud: 'cloud',

    /** Arquitetura */
    Architecture: 'architecture',

    /** Testes */
    Testing: 'testing',

    /** Engenharia */
    Engineering: 'engineering',

    /** Comunicação */
    Communication: 'communication',

    /** Liderança */
    Leadership: 'leadership',

    /** Trabalho em Equipe */
    Teamwork: 'teamwork',

    /** Resolução de Problemas */
    ProblemSolving: 'problem_solving',

    /** Adaptabilidade */
    Adaptability: 'adaptability',

    /** Criatividade */
    Creativity: 'creativity',

    /** Gestão do Tempo */
    TimeManagement: 'time_management',

    /** Pensamento Crítico */
    CriticalThinking: 'critical_thinking',

    /** Inteligência Emocional */
    EmotionalIntelligence: 'emotional_intelligence',

    /** Metodologia */
    Methodology: 'methdology',

    /** Ferramenta */
    Tool: 'tool',

    /** Design */
    Design: 'design',

    /** Sistema Operacional */
    OperatingSystem: 'operating_system',

    /** Redes de computadores*/
    ComputerNetworks: 'computer_networks',

    /** Networking social */
    SocialNetworking: 'social_networking',

    /** Segurança */
    Security: 'security',

    Frontend: 'frontend',

    Backend: 'backend',

    Mobile: 'mobile',

    /** Outros */
    Other: 'other',
});

export type SkillCategory = (typeof SkillCategory)[keyof typeof SkillCategory];
