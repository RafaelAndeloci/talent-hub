export const Language = Object.freeze({
    English: 'english',
    Spanish: 'spanish',
    French: 'french',
    German: 'german',
    Italian: 'italian',
    Chinese: 'chinese',
    Japanese: 'japanese',
    Korean: 'korean',
    Russian: 'russian',
    Portuguese: 'portuguese',
});

export type Language = (typeof Language)[keyof typeof Language];
