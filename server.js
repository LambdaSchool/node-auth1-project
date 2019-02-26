const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const server = express();
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');
const KnexSessionStore =require('connect-session-knex')(session);
const db = require('./data/helpers/usersModel');

const sessionConfig = {
    name: '__cookiee',
    secret: 'you are awesome!',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false
}

server.use(logger());
server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig))
server.use('/api', authRoutes);

module.exports = server;
