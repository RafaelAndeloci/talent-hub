/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { Action } from '../enums/action';
import { Resource } from '../enums/resource';
import { RequestHandler } from 'express';

export type AnyRequestHandler = RequestHandler<
    any,
    any,
    any,
    any,
    any | object extends any ? any : object
>;

export type Route = {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    auth?: boolean;
    path: string;
    action: Action;
    schema?: z.ZodObject<any, any>;
    handler: AnyRequestHandler;
    middlewares?: AnyRequestHandler[];
};

export type ApiResource = {
    resource: Resource;
    routes: Route[];
};
