import { AppEvent } from '../../enums/app-event';

//TODO: Implement event handlers for job openings
export const jobOpeningEventHandler = {
    [AppEvent.jobOpeningCreated]: async ({ jobOpeningId }: { jobOpeningId: string }) => {
        console.log(`Job opening ${jobOpeningId} created`);
    },

    [AppEvent.jobOpeningRemoved]: async ({ jobOpeningId }: { jobOpeningId: string }) => {
        console.log(`Job opening ${jobOpeningId} removed`);
    },

    [AppEvent.jobOpeningUpdated]: async ({ jobOpeningId }: { jobOpeningId: string }) => {
        console.log(`Job opening ${jobOpeningId} updated`);
    },

    [AppEvent.jobOpeningFilled]: async ({ jobOpeningId }: { jobOpeningId: string }) => {
        console.log(`Job opening ${jobOpeningId} filled`);
    },

    [AppEvent.jobOpeningClosed]: async ({ jobOpeningId }: { jobOpeningId: string }) => {
        console.log(`Job opening ${jobOpeningId} closed`);
    },

    [AppEvent.jobOpeningOpened]: async ({ jobOpeningId }: { jobOpeningId: string }) => {
        console.log(`Job opening ${jobOpeningId} opened`);
    },
};
