import { RequestHandler } from 'express';
import { RequestContext } from './request-context';

export type Handler<TRequest, TResponse, TQuery, TParams> = RequestHandler<
    TParams,
    TResponse,
    TRequest,
    TQuery,
    RequestContext
>;

export type AnyHandler = Handler<any, any, any, any>;

