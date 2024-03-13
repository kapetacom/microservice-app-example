import Config from '@kapeta/sdk-config';

export interface LogQueueConfig {
    channel: string;
}

export const getLogQueueConfig = (defaultValue: LogQueueConfig): LogQueueConfig => {
    return Config.getOrDefault<LogQueueConfig>('LogQueue', defaultValue);
};
