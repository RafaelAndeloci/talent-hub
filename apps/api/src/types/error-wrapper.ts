import { NextFunction } from 'express';

export const errorWrapper = async(handler: () => Promise<void>, next: NextFunction): Promise<void> => {
    try {
        await handler();
    } catch (error) {
        next(error);
    }
};
