import { ConfigProvider } from '@kapeta/sdk-config';
import { TodoRoutes } from 'generated:rest/TodoRoutes';
import {createTasksClient} from "generated:data/TasksDB";
import {getLogQueueConfig} from "generated:config/LogQueueConfig";
import {TaskResult} from "generated:entities/TaskResult";
import cache from "memory-cache";
import {Request, Response} from "express";

const OPERATION_CREATE = 'CREATE';
const OPERATION_DELETE = 'DELETE';

/**
 * Creates the TodoRouteService.
 *
 * Class is created inside the function to allow async initialization to happen. The class structure is optional
 * but just makes it easier to organize the code.
 *
 * @param configProvider The configuration provider to use.
 */
export const createTodoRouteService = async (configProvider: ConfigProvider): Promise<TodoRoutes> => {
    const tasksClient = await createTasksClient(configProvider);
    const config = getLogQueueConfig({
        channel: 'log_channel'
    });

    function _logOperation (opName:string, username:string, todoId:string|number) {
        tasksClient.publish(config.channel, JSON.stringify({
            opName: opName,
            username: username,
            todoId: todoId,
        }))
    }

    function _getTodoData (userID:string):TaskResult {
        var data = cache.get(userID)
        if (data == null) {
            data = {
                items: {
                    '1': {
                        id: 1,
                        content: "Create new todo",
                    },
                    '2': {
                        id: 2,
                        content: "Update me",
                    },
                    '3': {
                        id: 3,
                        content: "Delete example ones",
                    }
                },
                lastInsertedID: 3
            }

            _setTodoData(userID, data)
        }
        return data
    }

    function _setTodoData (userID:string, data:TaskResult) {
        cache.put(userID, data)
    }

    function requireAuth(req: Request<any, any, any, any>, res:Response): boolean {
        if (!req.auth) {
            res.status(401)
            res.send()
            return false
        }
        return true
    }

    function getUsername(req: Request<any, any, any, any>): string {
        if (req.auth!.payload.sub === undefined) {
            throw new Error('No user found in request');
        }
        if (typeof req.auth!.payload.sub !== 'string') {
            return req.auth!.payload.sub();
        }
        return req.auth!.payload.sub
    }

    return {
        /**
         *
         * HTTP: GET /todos/
         */
        list(req, res): void {
            if (!requireAuth(req, res)) {
                return;
            }

            const username = getUsername(req)
            const data = _getTodoData(username)

            res.json(data.items)
        },

        /**
         *
         * HTTP: POST /todos/
         */
        create(req, res): void {
            if (!requireAuth(req, res)) {
                return;
            }
            const username = getUsername(req)
            const data = _getTodoData(username)
            const todo = {
                content: req.body.content,
                id: data.lastInsertedID
            }
            data.items[data.lastInsertedID] = todo

            data.lastInsertedID++
            _setTodoData(username, data)

            _logOperation(OPERATION_CREATE, username, todo.id)

            res.json(todo)
        },

        /**
         *
         * HTTP: DELETE /todos/:taskId
         */
        delete(req, res): void {
            if (!requireAuth(req, res)) {
                return;
            }
            const username = getUsername(req)
            const data = _getTodoData(username)
            const id = req.params.taskId
            delete data.items[id]
            _setTodoData(username, data)

            _logOperation(OPERATION_DELETE, username, id)

            res.status(204)
            res.send()
        },
    };
};
