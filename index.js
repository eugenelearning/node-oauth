'use strict'
const fs = require('node:fs')
const path = require('node:path');
const ejs = require('ejs');
const view = require('@fastify/view');
const AutoLoad = require('@fastify/autoload')
const passport = require('@fastify/passport')
const session = require('@fastify/secure-session');

module.exports = async function (fastify, opts) {
    const secret = fs.readFileSync(path.join(__dirname, './configs/sessions/secret_key'));

    fastify.register(session, {
        key: secret,
        sessionName: 'session',
        cookieName: 'app_s',
        cookie: { path: '/' }
    });

    fastify.register(passport.initialize())
    fastify.register(passport.secureSession());

    fastify.register(view, { engine: { ejs } });

    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts)
    });

    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        options: Object.assign({}, opts)
    });
}