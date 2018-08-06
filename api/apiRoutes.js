const express = require('express');
const db = require('../data/dbConfig.js');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/register', (req, res) => {
  const user = {...req.body};
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  db('users')
    .insert(user)
    .then(id => {
      return res.status(200).json({'message':`${user.username} added!`});
    })
    .catch(() => {
      return res.status(500).json({'error': 'Could not add user.'});
    });
});

router.post('/login', (req, res) => {
  const credentials = {...req.body};

  db('users')
    .where({username: credentials.username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        req.session.userId = user.id;
        return res.status(200).json({'message':`${user.username} logged in.`});
      }
      return res.status(401).json({'error': 'You shall not pass!'});
    })
    .catch(e => {
      return res.status(500).json(e);
    });
});

router.get('/users', (req, res) => {
  if (req.session.userId) {
    db.select('id', 'username', 'created_at').from('users')
    .then( users => {
      return res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err));
  } else {
    return res.status(401).json({'error': 'You shall not pass!'});
  }
});

module.exports = router;