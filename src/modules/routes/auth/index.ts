import fp from 'fastify-plugin';

import { loginProcess } from '../../services/auth-service';
import { LoginTO } from './schema';

export default fp((server, opts, next) => {

    server.post("/login", {schema : LoginTO}, (request, reply) => {
        try {
            loginProcess(server,request.body).then(data => {
                return reply.code(200).send({
                    success: true,
                    message: 'login successfull',
                    data
                });
            })
            .catch(err => {
                server.apm.captureError({
                    method: request.routerMethod,
                    path: request.routerPath,
                    param: request.body,
                    error: err,
                });

                return reply.code(400).send({
                    success: false,
                    message: 'Error login',
                    err,
                });
            });
            
        } catch(error) {
            server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error: error,
            });

            request.log.error(error);
            return reply.send(400);
        }
    });

    next();
});