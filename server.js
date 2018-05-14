const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

mongoose
.connect('mongodb://localhost/authpassdb')
.then(conn => {
    console.log('\n=== connected to mongo ===\n')
})
.catch(err => {
    console.log('error connecting to mongo', err)
})

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', function(req, res) {
    res.status(200).json({ api: 'running' })
})

server.listen(9000, () => {console.log('/n=== Server running on 9k ===/n')})