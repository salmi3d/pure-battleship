require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const { VUE_APP_PORT: PORT = 3000, NODE_ENV = 'development' } = process.env

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

const players = [null, null]

io.on('connection', socket => {
  const playerIndex = players.findIndex(layer => layer === null)

  socket.emit('playerNumber', playerIndex)
  if (playerIndex === -1) return

  players[playerIndex] = false
  console.log(`${playerIndex} has connected`)
  socket.broadcast.emit('playerConnected', playerIndex)

  socket.on('disconnect', () => {
    console.log(`${playerIndex} has disconnected`)
    players[playerIndex] = null
    socket.broadcast.emit('playerDisconnected', playerIndex)
  })

  socket.on('playerReady', () => {
    players[playerIndex] = true
    socket.broadcast.emit('enemyReady', playerIndex)
  })

  socket.on('checkPlayers', () => {
    const realPlayers = players.map(player => ({
      isConnected: player !== null,
      isReady: player !== null && player
    }))
    socket.emit('checkPlayers', realPlayers)
  })

  socket.on('hit', squareId => socket.broadcast.emit('hit', squareId))
  socket.on('hitReply', payload => socket.broadcast.emit('hitReply', payload))
})
