
const fp = require('@fastify/passport');

module.exports = function (fastify, _, done) {
    fastify.get(
        '/secure',
        {
            preValidation: (request, reply, done) => {
                if (!request.user) {
                    reply.redirect('/')
                }
                
                done()
            }
        },
        async function () {
            return 'Super secret data!';
        }
    );

    done();
}