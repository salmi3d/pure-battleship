require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const { PORT = 3000, NODE_ENV = 'development' } = process.env

app.use(cors())

if (NODE_ENV === 'production') {
  const DIST_PATH = path.join(__dirname, 'dist')
  app.use('/', express.static(DIST_PATH))
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_PATH, 'index.html'))
  })
} else {
  app.use(morgan('dev'))
}

server.listen(PORT, () => console.log(`Server has been started on port *:${PORT}...`))

const db = {}

io.on('connection', socket => {
  let playerIndex
  let roomId

  socket.on('playerJoined', id => {
    roomId = id
    if (!db[roomId]) {
      db[roomId] = [null, null]
    }
    playerIndex = db[roomId].findIndex(player => player === null)
    socket.emit('playerNumber', playerIndex)
    if (playerIndex === -1) return

    db[roomId][playerIndex] = false
    socket.join(roomId)
    console.log(`${playerIndex} has connected to room ${roomId}`)
    socket.broadcast.to(roomId).emit('playerConnected', playerIndex)
  })

  socket.on('disconnect', () => {
    if (roomId === undefined || playerIndex === undefined) return
    console.log(`${playerIndex} has disconnected from room ${roomId}`)
    db[roomId][playerIndex] = null
    const activePlayersInRoom = db[roomId].filter(player => player !== null)
    if (activePlayersInRoom.length === 0) {
      delete db[roomId]
    }
    socket.broadcast.to(roomId).emit('playerDisconnected', playerIndex)
  })

  socket.on('playerReady', () => {
    db[roomId][playerIndex] = true
    socket.broadcast.to(roomId).emit('enemyReady', playerIndex)
  })

  socket.on('checkPlayers', () => {
    const realPlayers = db[roomId].map(player => ({
      isConnected: player !== null,
      isReady: player !== null && player
    }))
    socket.emit('checkPlayers', realPlayers)
  })

  socket.on('hit', squareId => socket.broadcast.to(roomId).emit('hit', squareId))
  socket.on('hitReply', payload => socket.broadcast.to(roomId).emit('hitReply', payload))
})
