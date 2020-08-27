import ships from './ships'
import { generateComputerShips } from './generate-ships'
import { currentPlayer, message, whoGo, isGameOver, resetState, userSquares, enemySquares, userScore, enemyScore, players, playerNumber, gameMode, allReady } from './state'
import { playerReady, hit, disconnect } from './sockets'

export const startGame = () => {
  isGameOver.value = false
  if (gameMode.value === 'singlePlayer') {
    generateComputerShips()
    whoGo.value = 'Your turn'
  } else if (gameMode.value === 'multiPlayer') {
    if (!players.value[playerNumber.value].isReady) {
      playerReady()
    }
    if (!allReady.value) return
    if (currentPlayer.value === 'user') {
      whoGo.value = 'Your turn'
    } else if (currentPlayer.value === 'enemy') {
      whoGo.value = `Enemy's turn`
    }
  }
}

export const userGo = payload => {
  const stepType = payload instanceof MouseEvent ? 'request' : 'response'

  if (isGameOver.value
    || currentPlayer.value === 'enemy'
    || (!allReady.value && gameMode.value === 'multiPlayer')) return

  let squareId, classList

  if (stepType === 'request' || gameMode.value === 'singlePlayer') {
    squareId = +payload.target.dataset.id
    if (isNaN(squareId)) return
    classList = enemySquares.value[squareId].classList
    if (gameMode.value === 'multiPlayer') return hit(squareId)
  } else if (stepType === 'response' && gameMode.value === 'multiPlayer') {
    squareId = payload.squareId
    if (isNaN(squareId)) return
    classList = payload.classList
  }

  if (gameMode.value === 'singlePlayer' && (classList.includes('bang') || classList.includes('miss'))) return

  if (!classList.includes('bang') || gameMode.value === 'multiPlayer') {
    ships.forEach(ship => {
      if (!classList.includes(ship.name)) return
      userScore.value[ship.name] = userScore.value[ship.name] + 1 || 1
    })
  }

  enemySquares.value[squareId].classList = [...new Set([...classList, classList.includes('taken') ? 'bang' : 'miss'])]

  if (checkForWins()) return

  currentPlayer.value = 'enemy'
  whoGo.value = `Enemy's turn`
  if (gameMode.value === 'singlePlayer') {
    setTimeout(enemyGo, 500)
  }
}

export const enemyGo = squareId => {
  if (isGameOver.value || (!allReady.value && gameMode.value === 'multiPlayer')) return
  if (gameMode.value === 'singlePlayer') {
    squareId = Math.floor(Math.random() * userSquares.value.length)
  }
  const { classList } = userSquares.value[squareId]
  if ((classList.includes('bang') || classList.includes('miss'))
    && gameMode.value === 'singlePlayer') return enemyGo()

  if (!classList.includes('bang')) {
    ships.forEach(ship => {
      if (!classList.includes(ship.name)) return
      enemyScore.value[ship.name] = enemyScore.value[ship.name] + 1 || 1
    })
  }

  userSquares.value[squareId].classList = [...new Set([...classList, classList.includes('taken') ? 'bang' : 'miss'])]

  if (checkForWins()) return
  currentPlayer.value = 'user'
  whoGo.value = 'Your turn'
}

const checkForWins = () => {
  let userTotalScore = 0
  let enemyTotalScore = 0

  for (const [shipName, score] of Object.entries(userScore.value)) {
    if (score === ships.find(s => s.name === shipName).scope) {
      userTotalScore++
      userScore.value[shipName] = -1
      message.value = `You sunk the enemy's ${shipName}`
    } else if (score === -1) {
      userTotalScore++
    }
  }

  if (userTotalScore === ships.length) {
    setTimeout(() => {
      alert(`You won!`)
      gameOver()
    }, 100)
    return true
  }

  for (const [shipName, score] of Object.entries(enemyScore.value)) {
    if (score === ships.find(s => s.name === shipName).scope) {
      enemyTotalScore++
      enemyScore.value[shipName] = -1
      message.value = `The enemy sunk your ${shipName}`
    } else if (score === -1) {
      enemyTotalScore++
    }
  }
  if (enemyTotalScore === ships.length) {
    setTimeout(() => {
      alert(`The enemy won!`)
      gameOver()
    }, 100)
    return true
  }

  return false
}

export const gameOver = () => {
  disconnect()
  resetState()
}
