import { AppEvent } from '../../enums/app-event';

//TODO: Implement event handlers for job applications
export const jobApplicationEventHandler = {
    [AppEvent.jobApplicationCreated]: async ({
        jobApplicationId,
    }: {
        jobApplicationId: string;
    }) => {
        console.log(`Job application ${jobApplicationId} created`);
    },

    [AppEvent.jobApplicationRemoved]: async ({
        jobApplicationId,
    }: {
        jobApplicationId: string;
    }) => {
        console.log(`Job application ${jobApplicationId} removed`);
    },

    [AppEvent.jobApplicationStageUpdated]: async ({
        jobApplicationId,
    }: {
        jobApplicationId: string;
    }) => {
        console.log(`Job application ${jobApplicationId} stage updated`);
    },

    [AppEvent.jobApplicationStatusUpdated]: async ({
        jobApplicationId,
    }: {
        jobApplicationId: string;
    }) => {
        console.log(`Job application ${jobApplicationId} status updated`);
    },
};
