import { AppEvent } from '../../enums/app-event';

//TODO: Implement event handlers for job applications
export const jobApplicationEventHandler = {
    [AppEvent.JobApplicationCreated]: async ({
        jobApplicationId,
    }: {
        jobApplicationId: string;
    }) => {
        console.log(`Job application ${jobApplicationId} created`);
    },

    [AppEvent.JobApplicationRemoved]: async ({
        jobApplicationId,
    }: {
        jobApplicationId: string;
    }) => {
        console.log(`Job application ${jobApplicationId} removed`);
    },

    [AppEvent.JobApplicationStageUpdated]: async ({
        jobApplicationId,
    }: {
        jobApplicationId: string;
    }) => {
        console.log(`Job application ${jobApplicationId} stage updated`);
    },

    [AppEvent.JobApplicationStatusUpdated]: async ({
        jobApplicationId,
    }: {
        jobApplicationId: string;
    }) => {
        console.log(`Job application ${jobApplicationId} status updated`);
    },
};
