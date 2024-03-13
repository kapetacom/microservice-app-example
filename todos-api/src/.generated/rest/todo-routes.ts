//
// GENERATED SOURCE - DO NOT EDIT
//
import { Router } from 'express';
import { asyncHandler } from '@kapeta/sdk-server';
import { ConfigProvider } from '@kapeta/sdk-config';
import { restAPIMiddleware, createRESTParameterParser } from '@kapeta/sdk-rest-route';
import { createTodoRouteService } from '../../service/TodoRouteService';
import { ListRequest, ListResponse, CreateRequest, CreateResponse, DeleteRequest, DeleteResponse } from './TodoRoutes';
import { json } from 'body-parser';

/**
 * creates all routes for the Todo API
 */
export const createTodoRouter = async (configProvider: ConfigProvider) => {
    const router = Router();
    router.use(json());
    router.use(restAPIMiddleware);

    const service = await createTodoRouteService(configProvider);

    // list: Verify the method is available
    if (!service.list) {
        throw new Error('REST resource service for "Todo" is missing method: "list"');
    }

    console.log('Publishing REST method: GET /todos');

    router.get(
        '/todos',
        createRESTParameterParser<ListRequest, ListResponse>([]),
        asyncHandler(service.list.bind(service))
    );

    // create: Verify the method is available
    if (!service.create) {
        throw new Error('REST resource service for "Todo" is missing method: "create"');
    }

    console.log('Publishing REST method: POST /todos');

    router.post(
        '/todos',
        createRESTParameterParser<CreateRequest, CreateResponse>([
            { name: 'task', transport: 'BODY', typeName: 'Task' },
        ]),
        asyncHandler(service.create.bind(service))
    );

    // delete: Verify the method is available
    if (!service.delete) {
        throw new Error('REST resource service for "Todo" is missing method: "delete"');
    }

    console.log('Publishing REST method: DELETE /todos/:taskId');

    router.delete(
        '/todos/:taskId',
        createRESTParameterParser<DeleteRequest, DeleteResponse>([
            { name: 'taskId', transport: 'PATH', typeName: 'string' },
        ]),
        asyncHandler(service.delete.bind(service))
    );

    return router;
};
