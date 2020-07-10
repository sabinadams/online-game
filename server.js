const express = require('express')
      app = express(),
      http = require('http').createServer(app),
      io = require('socket.io')(http)

let connections = []

app.use(express.static(__dirname + '/'))

io.on('connection', socket => {
    io.to(socket.id).emit('welcome', socket.id, connections)
    socket.broadcast.emit('addUser', socket.id)
    connections.push({
        socketID: socket.id,
        x: 20,
        y: 20
    })
})

io.on('updateUser', socket => {
    console.log(socket)
})

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`))
  
io.on('connection', socket => {
    console.log('a user connected')
})

http.listen(3000, () => {
    console.log('listening on *:3000')
})