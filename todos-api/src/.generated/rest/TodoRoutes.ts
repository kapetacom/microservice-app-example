//
// GENERATED SOURCE - DO NOT EDIT
//
import type { Request, Response } from 'express';
import { Task } from 'generated:entities/Task';

export type ListRequest<Locals extends Record<string, any> = Record<string, any>> = Request<
    void,
    { [key: string]: Task },
    void,
    void,
    Locals
>;
export type ListResponse<Locals extends Record<string, any> = Record<string, any>> = Response<
    { [key: string]: Task },
    Locals
>;

export type CreateRequest<Locals extends Record<string, any> = Record<string, any>> = Request<
    void,
    Task,
    Task,
    void,
    Locals
>;
export type CreateResponse<Locals extends Record<string, any> = Record<string, any>> = Response<Task, Locals>;

export type DeleteRequest<Locals extends Record<string, any> = Record<string, any>> = Request<
    { taskId: string },
    void,
    void,
    void,
    Locals
>;
export type DeleteResponse<Locals extends Record<string, any> = Record<string, any>> = Response<void, Locals>;

/**
 * Defines the types for methods and routes of the Todo API
 */
export interface TodoRoutes<Locals extends Record<string, any> = Record<string, any>> {
    /**
     *
     * HTTP: GET /todos
     */
    list(req: ListRequest<Locals>, res: ListResponse<Locals>): void | Promise<void>;

    /**
     *
     * HTTP: POST /todos
     */
    create(req: CreateRequest<Locals>, res: CreateResponse<Locals>): void | Promise<void>;

    /**
     *
     * HTTP: DELETE /todos/:taskId
     */
    delete(req: DeleteRequest<Locals>, res: DeleteResponse<Locals>): void | Promise<void>;
}
