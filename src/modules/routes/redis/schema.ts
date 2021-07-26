export const SendTO = {
    description: 'Redis send data',
    tags: ['Redis'],
    summary: 'Redis send data',
    body: {
        type: 'object',
        properties: {
            redisKey: { type: 'string' },
            redisVal: { type: 'string' },
        }
    },
    response: {
        200: {
            description: 'Successful send data to redis',
            type: 'object',
            properties: {
                success: { type: 'string' },
                message: { type: 'string' },
                data: { 
                    type: 'object',
                    properties: {
                        redisKey: { type: 'string' },
                        redisVal: { type: 'string' },
                    }
                }
            }
        }
    }
};

export const GetTO = {
    description: 'Redis get data',
    tags: ['Redis'],
    summary: 'Redis get data',
    body: {
        type: 'object',
        properties: {
            redisKey: { type: 'string' },
        }
    },
    response: {
        200: {
            description: 'Successful get data to redis',
            type: 'object',
            properties: {
                success: { type: 'string' },
                message: { type: 'string' },
                data: { 
                    type: 'object',
                    properties: {
                        redisKey: { type: 'string' },
                        redisVal: { type: 'string' },
                    }
                }
            }
        }
    }
};

export interface redisTO {
    redisKey: string;
    redisVal: string;
}