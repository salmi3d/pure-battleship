import { BOARD_SIZE } from '@/lib/constants'
import ships from '@/lib/ships'
import { enemySquares } from '@/lib/state'

export const generateShip = ship => {
  const randomDirection = Math.floor(Math.random() * ship.directions.length)
  const current = ship.directions[randomDirection]
  const direction = randomDirection === 0 ? 1 : BOARD_SIZE

  const randomStart = Math.abs(Math.floor(Math.random() * enemySquares.value.length - ship.directions[0].length * direction))

  const isTaken = current.some(idx => enemySquares.value[randomStart + idx].classList.includes('taken'))
  const isAtRightEdge = current.some(idx => (randomStart + idx) % BOARD_SIZE === BOARD_SIZE - 1)
  const isAtLeftEdge = current.some(idx => (randomStart + idx) % BOARD_SIZE === 0)

  if (isTaken || isAtRightEdge || isAtLeftEdge) return generateShip(ship)

  current.forEach(idx => enemySquares.value[randomStart + idx].classList = ['taken', ship.name])
}

export const generateComputerShips = () => ships.forEach(ship => generateShip(ship))
