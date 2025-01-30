import { NextFunction, Request, Response } from 'express';

export type MiddlewareFactory<TArgs> = (
    args: TArgs,
) => (req: Request, res: Response, next: NextFunction) => void | Promise<void>;
