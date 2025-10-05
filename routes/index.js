'use strict'

module.exports = async function (fastify) {
    fastify.get('/', async function (request, reply) {
        return reply.view('/templates/index.ejs', { user: request.user });
    });

    fastify.get('/login', (_, reply) => {
        return reply.view('/templates/login.ejs', { text: 'text' });
    });

    fastify.get('/logout', async (request, reply) => {
        await request.logout();
        return reply.redirect('/');
    });
}
