import * as redis from 'redis';

export const client = redis.createClient();

export const theatreCachePrefix: string = 'theater:';
export const showDatesCachePrefix: string = 'showDates:';