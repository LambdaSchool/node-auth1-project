const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile');
const server = express();
const db = knex(dbConfig.development);
const bcrypt = require('bcryptjs');
server.use(express.json());
server.use(helmet());

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

server.post('/api/register',    (req, res)  =>  {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password);
    user.username = user.username.toUpperCase();
    db('users').insert(user)
        .then(ids   =>  {
            res.status(201).json({id: ids[0]});
        })
        .catch(err  =>  {
            res.status(500).send(err);
        })
})

server.post('/api/login',   (req, res)  =>  {
    const bodyUser  =   req.body;
    db('users').where('username', bodyUser.username.toUpperCase())
        .then(users =>  {
            if(users.length && bcrypt.compareSync(bodyUser.password, users[0].password))    {
                res.json({ info: "correct"});
            }   else {
                res.status(404).json({err: "invalid username or password"});
            }
        })
        .catch(err  =>  {
            res.status(500).json(err);
        })
})

server.get('/api/users',    (req, res)  =>  {
    db('users').select("username")
        .then(users =>  {
            res.json(users);
        })
})
