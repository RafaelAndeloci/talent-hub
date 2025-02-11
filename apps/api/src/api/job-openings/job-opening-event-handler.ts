import { AppEvent } from '../../enums/app-event';

//TODO: Implement event handlers for job openings
export const jobOpeningEventHandler = {
    [AppEvent.JobOpeningCreated]: async ({ jobOpeningId }: { jobOpeningId: string }) => {
        console.log(`Job opening ${jobOpeningId} created`);
    },

    [AppEvent.JobOpeningRemoved]: async ({ jobOpeningId }: { jobOpeningId: string }) => {
        console.log(`Job opening ${jobOpeningId} removed`);
    },

    [AppEvent.JobOpeningUpdated]: async ({ jobOpeningId }: { jobOpeningId: string }) => {
        console.log(`Job opening ${jobOpeningId} updated`);
    },

    [AppEvent.JobOpeningFilled]: async ({ jobOpeningId }: { jobOpeningId: string }) => {
        console.log(`Job opening ${jobOpeningId} filled`);
    },

    [AppEvent.JobOpeningClosed]: async ({ jobOpeningId }: { jobOpeningId: string }) => {
        console.log(`Job opening ${jobOpeningId} closed`);
    },

    [AppEvent.JobOpeningOpened]: async ({ jobOpeningId }: { jobOpeningId: string }) => {
        console.log(`Job opening ${jobOpeningId} opened`);
    },
};
