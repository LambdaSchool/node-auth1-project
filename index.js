const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs')

const db = require('./database/dbConfig');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send(`I'm alive!`)
});

server.get('/api/users', (req, res) => {
    db('users')
    .select('id', 'username', 'password')
    .then(users => {
        res.json(users)
    })
    .catch(err => res.send(`You shall not pass!`))
})

server.post('/api/register', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 14)
    db('users').insert(user)
    .then(ids => {
        res.status(201).json({id: ids[0]})
    })
    .catch(error => {
        res.status(500).send(`You shall not pass!`)
    })
})

server.post('/api/login', (req, res) => {
    const userBody = req.body;
    db('users').where('username', userBody.username)
    .then(users => {
        if(users.length && bcrypt.compareSync(userBody.password, users[0].password)){
            res.json(`Correct`)
        } else {
            res.status(404).json(`You shall not pass!`)
        }
    })
    .catch(err => {res.status(500).send(err)})
})

server.listen(2525, () => console.log(`I'm alive!`))