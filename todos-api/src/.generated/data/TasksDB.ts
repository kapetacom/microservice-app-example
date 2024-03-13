//
// GENERATED SOURCE - DO NOT EDIT
//
import Config, { ConfigProvider } from '@kapeta/sdk-config';
import { RedisDB as $RedisDB, createRedisClient as $createRedisClient, RedisClient } from '@kapeta/sdk-redis';

/**
 * Create a Redis client for the tasks database.
 */
export const createTasksClient = (config?: ConfigProvider): Promise<RedisClient> => {
    return $createRedisClient(config ?? Config.getProvider(), 'tasks');
};

/**
 * Use this class to access the tasks database.
 *
 * Recommended use is to call the ```createTasksClient``` function to create a client.
 */
export class TasksDB extends $RedisDB {
    constructor() {
        super('tasks');
    }
}
