import Config from '@kapeta/sdk-config';

export interface JWTConfig {
    secret: string;
}

export const getJWTConfig = (defaultValue: JWTConfig): JWTConfig => {
    return Config.getOrDefault<JWTConfig>('JWT', defaultValue);
};
