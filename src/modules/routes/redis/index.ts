import fp from 'fastify-plugin';

import { RedisOperation } from '../../services/redis-service';
import { SendTO,GetTO,redisTO} from './schema';

export default fp((server, opts, next) => {

    server.post("/redis/send", {schema : SendTO }, (request, reply) => {
        try {
            const redis = new RedisOperation(server);
            const { redisKey, redisVal } = request.body;

            redis.addVal(redisKey, redisVal)
            .then(res => {
                let data = {redisKey,redisVal};
                return reply.code(200).send({
                    success: true,
                    message: res,
                    data,
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
                    message: 'Error send data to redis',
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

    server.post("/redis/get", {schema : GetTO }, (request, reply) => {
        try {
            const redis = new RedisOperation(server);
            const { redisKey } = request.body;

            redis.getbyKey(redisKey)
            .then(res => {
                let data = {redisKey,redisVal:res};
                return reply.code(200).send({
                    success: true,
                    message: 'success get data from redis',
                    data,
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
                    message: 'Error get data from redis',
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