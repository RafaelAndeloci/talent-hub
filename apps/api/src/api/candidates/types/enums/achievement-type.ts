export const AchievementType = Object.freeze({
    /** Curso, treinamento */
    TrainingCertificate: 'training_certificate',
    /** Participação em evento */
    EventParticipation: 'event_participation',
    /** Prêmio */
    Award: 'award',
    /** Reconhecimento */
    Recognition: 'recognition',
    /** Realização */
    Achievement: 'achievement',
});

export type AchievementType = (typeof AchievementType)[keyof typeof AchievementType];
