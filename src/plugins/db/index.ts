import fp from 'fastify-plugin'
import * as dbSequel from "sequelize";

// import { BooksFactory } from './models';

const dbPlugin = (async (server, opts, next) => {

    // database
    const dbSequelize = new dbSequel.Sequelize(server.conf.db, server.conf.dbUsername, server.conf.dbPassword, {
        // other sequelize config goes here
        dialect: server.conf.dbDialect,
        host: server.conf.dbHost,
        port: Number.parseInt(server.conf.dbPort),
        dialectOptions: {
            options: { encrypt: false }
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    });

    // // SOMETHING VERY IMPORTANT them Factory functions expect a
    // // sequelize instance as parameter give them `dbSequelize`
    // export const User = UserFactory(dbSequelize);
    // export const Skills = SkillsFactory(dbSequelize);

    // decorators
    server.decorate('db', dbSequelize);

    server.addHook('onClose', (fastifyInstance, done) => {
        dbSequelize.close()
            .then(() => done())
            .catch((error) => {
                const { message, stack } = error;
                let err = {

                    method: 'DB Connection Closing',
                    message,
                    stack
                };

                // server.apm.captureError(JSON.stringify(err));
                done()
            });
    });

    server.log.info('Checking Connection.');
    server.db
        .authenticate()
        .then(async () => {
            server.log.info('Database Connection has been established successfully.');
        })
        .catch(err => {
            server.apm.captureError({
                method: "Connecting to database",
                error: err,
            })

            server.log.error('Unable to connect to the database:', err);
        });

    // const Book = BooksFactory(dbSequelize);
    // server.db.sync({force:true});
    server.db.sync();

});

export default fp(dbPlugin);