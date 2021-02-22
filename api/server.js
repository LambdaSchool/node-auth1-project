const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session)

const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');

const server = express();

const config ={
    name:"sessionId",
  secret: "keep it secret, keep it safe",
  cookie:{
    maxAge: 1000 * 60 * 60,
    secure:false,
    httpOnly: true
  },
  resave:false,
  saveUnitialized:false,
  store: new KnexSessionStore({
    knex:require("../database/connection.js"),
    tablename:"sessions",
    sidfieldname:"sid",
    createTable:true,
    clearInterval:1000 * 60 * 60
  })
};

server.use(session(config));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

module.exports = server;
