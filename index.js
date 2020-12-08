const server = require('./api/server');

const PORT = 2000;

server.get('/api', (req, res)=>{

    res.json({message: 'Hello'})
})

server.listen(PORT, ()=>{
    console.log(`Server is listening on PORT : ${PORT}`)
})
