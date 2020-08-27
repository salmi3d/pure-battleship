import { BOARD_SIZE } from '@/lib/constants'

export const generateSquares = () => Array.from(
  new Array(BOARD_SIZE ** 2),
  (_, idx) => ({
    id: idx,
    classList: []
  })
)
