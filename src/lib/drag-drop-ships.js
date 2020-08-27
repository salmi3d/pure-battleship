import ships from '@/lib/ships'
import { BOARD_SIZE } from '@/lib/constants'
import { rawShips, isHorizontal, userSquares } from '@/lib/state'

let draggedShipWithIndex
let draggedShipClass
let draggedShipLength

export const userShipsMouseDown = e => draggedShipWithIndex = e.target.getAttribute('data-id')

export const dragStart = e => {
  draggedShipClass = e.target.dataset.id
  draggedShipLength = ships.find(ship => ship.name === draggedShipClass).scope
}

export const dragDrop = e => {
  const draggableShipIndex = +draggedShipWithIndex.substr(-1)

  const droppedSquareId = +e.target.dataset.id
  const droppedRow = Math.floor(droppedSquareId / BOARD_SIZE)
  const droppedColumn = droppedSquareId % BOARD_SIZE

  const availableSquares = {}
  for (let i = 0; i < BOARD_SIZE; i++) {
    const id = isHorizontal.value
      ? droppedRow * BOARD_SIZE + i
      : droppedColumn + i * BOARD_SIZE
    availableSquares[id] = !userSquares.value[id].classList.includes('taken')
  }

  const wantedSquares = []
  for (let i = 0; i < draggedShipLength; i++) {
    const wantedSquare = isHorizontal.value
      ? droppedRow * BOARD_SIZE + droppedColumn + i - draggableShipIndex
      : droppedRow * BOARD_SIZE + droppedColumn + (i - draggableShipIndex) * BOARD_SIZE
    if (!availableSquares[wantedSquare]) return
    wantedSquares.push(wantedSquare)
  }

  const directionClass = isHorizontal.value ? 'horizontal' : 'vertical'

  wantedSquares.forEach((squareId, idx) => {
    const classList = ['taken', directionClass, draggedShipClass]
    if (idx === 0) {
      classList.push('start')
    } else if (idx === wantedSquares.length - 1) {
      classList.push('end')
    }
    userSquares.value[squareId].classList = classList
  })

  rawShips.value = rawShips.value.filter(ship => ship.name !== draggedShipClass)
}
