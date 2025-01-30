export const AchievementType = Object.freeze({
    TrainingCertificate: 'training_certificate',
    EventParticipation: 'event_participation',
    Award: 'award',
    Recognition: 'recognition',
    Achievement: 'achievement',
});

export type AchievementType = (typeof AchievementType)[keyof typeof AchievementType];
