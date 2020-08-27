import { BOARD_SIZE } from '@/lib/constants'

const getDirections = size => {
  const h = Array.from(new Array(size), (_, idx) => idx)
  const v = Array.from(new Array(size), (_, idx) => idx * BOARD_SIZE)
  return [h, v]
}

const ships = [
  {
    name: 'destroyer',
    scope: 2,
    directions: getDirections(2)
  },
  {
    name: 'submarine',
    scope: 3,
    directions: getDirections(3)
  },
  {
    name: 'cruiser',
    scope: 3,
    directions: getDirections(3)
  },
  {
    name: 'battleship',
    scope: 4,
    directions: getDirections(4)
  },
  {
    name: 'carrier',
    scope: 5,
    directions: getDirections(5)
  },
]

export default ships

export const getShips = () => [...ships]
