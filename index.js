const express = require('express');
const helmet = require('helmet');
const bcrypt = require ('bcryptjs');


const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req,res) => {
    res.send('I Am Alive!');
})

server.post('/api/register', (req, res) => {
    const credentials = req.body;
    // hash the password
    const hash = bcrypt.hashSync(credentials.password, 14) // 2^14 times
    credentials.password= hash;
    // save user
    db('users')
    .insert(credentials)
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ newUserId: id})
    })
    .catch(err => {
      res.status(500).json(err)
    })
  })

server.post('/login', (req, res) => {
    const creds = req.body;
    db('users')
    .where({ username: creds.username})
    .first()
    .then(user => {
      // found user - right password or not (compare sync) -- compare to user password (hash same, found)
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        res.status(200).json({ welcome: user.username})
  
      } else {
        res.status(404).json({ message: 'You shall not pass!'})
      }
    })
    .catch(err => res.status(500).json(err))
  })

server.listen(3700, () => console.log('\n Party at part 3700 '))
