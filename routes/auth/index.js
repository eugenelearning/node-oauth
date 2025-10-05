const passport = require('@fastify/passport');
const google = require('./google');

module.exports = function (fastify, _, done) {
    passport.registerUserSerializer(async (user) => {
        return user;
    });

    passport.registerUserDeserializer(async (id) => {
        return await id;
    });

    fastify.register(google, { prefix: 'google' });

    fastify.get('/', async function (request, reply) {
        return reply.view('/templates/index.ejs', { user: request.user });
    });

    done();
}