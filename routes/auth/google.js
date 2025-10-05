module.exports = function (fastify, opts, done) {
    const passport = require('@fastify/passport');
    const GoogleStrategy = require('passport-google-oauth20').Strategy;

    passport.use('google',
        new GoogleStrategy({
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: "http://localhost:3010/auth/google/callback"
        },
            function (accessToken, refreshToken, profile, done) {
                return done(null, profile);
            }
        ));

    fastify.get('/', passport.authenticate('google', { scope: ['profile'] }));

    fastify.get('/callback', { preValidation: passport.authenticate('google') }, async function (_, reply) {
        reply.redirect('/')
    });

    done()
}