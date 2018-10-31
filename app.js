var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

http.listen(5000, () => {
    console.log('Successfully connected to the server.')
})

io.on('connection', (socket) => {
    console.log('A user connected!')

    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })

    socket.on('Created', (data) => {
        socket.broadcast.emit('Created', (data))
    })

    socket.on('chat-message', (data) => {
        socket.broadcast.emit('chat-message', (data))
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', (data))
    })

    socket.on('notTyping', (data) => {
        socket.broadcast.emit('notTyping', (data))
    })
})