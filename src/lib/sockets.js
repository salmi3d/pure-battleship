import { playerNumber, currentPlayer, message, players, socket, userSquares, roomId } from './state'
import { startGame, enemyGo, userGo } from './game-progress'
import ships from './ships'

export const sockets = {
  playerNumber: num => {
    if (num === -1) {
      message.value = 'Sorry, the server is full'
    } else {
      playerNumber.value = num
      if (playerNumber.value === 1) {
        currentPlayer.value = 'enemy'
      }
      players.value[playerNumber.value].isConnected = true
      socket.value.emit('checkPlayers')
    }
  },
  playerConnected: num => {
    players.value[num].isConnected = true
  }
  ,
  playerDisconnected: num => {
    players.value[num].isConnected = false
    players.value[num].isReady = false
  },
  enemyReady: num => {
    players.value[num].isReady = true
    if (players.value[playerNumber.value].isReady) {
      startGame()
    }
  },
  checkPlayers: serverPlayers => {
    serverPlayers.forEach((p, idx) => {
      if (idx === playerNumber.value) return
      players.value[idx].isConnected = p.isConnected
      players.value[idx].isReady = p.isReady
    })
  },
  hit: squareId => {
    enemyGo(squareId)
    socket.value.emit('hitReply', {
      squareId,
      classList: userSquares.value[squareId].classList.filter(c => c === 'taken' || ships.map(ship => ship.name).includes(c))
    })
  },
  hitReply: payload => {
    userGo(payload)
  }
}

export const assignSocket = s => {
  socket.value = s
}

export const connect = () => {
  if (socket.value && socket.value.disconnected) {
    socket.value.connect()
  }
  socket.value.emit('playerJoined', roomId.value)
}

export const disconnect = () => {
  if (socket.value && socket.value.connected) {
    socket.value.disconnect()
  }
}

export const playerReady = () => {
  socket.value.emit('playerReady')
  players.value[playerNumber.value].isReady = true
}

export const hit = squareId => {
  socket.value.emit('hit', squareId)
}
