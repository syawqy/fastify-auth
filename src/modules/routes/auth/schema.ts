export const LoginTO = {
    description: 'LoginDetail',
    tags: ['Login'],
    summary: 'Login',
    body: {
        type: 'object',
        properties: {
            username: { type: 'string' },
            password: { type: 'string' },
        }
    },
    response: {
        200: {
            description: 'Successful login',
            type: 'object',
            properties: {
                success: { type: 'string' },
                message: { type: 'string' },
                data: { type: 'string' }
            }
        }
    }
};