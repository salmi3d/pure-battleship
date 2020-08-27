import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)

import { reactive, toRefs, computed } from '@vue/composition-api'
import { getShips } from '@/lib/ships'
import { generateSquares } from '@/lib/generate-squares'

const initialState = () => ({
  whoGo: '',
  message: '',
  isHorizontal: true,
  isGameOver: true,
  currentPlayer: 'user',
  gameMode: '',
  playerNumber: 0,
  socket,
  rawShips: getShips(),
  userSquares: generateSquares(),
  enemySquares: generateSquares(),
  userScore: {},
  enemyScore: {},
  players: Array.from(
    new Array(2), (_, idx) => ({
      id: idx,
      isConnected: false,
      isReady: false,
      whoseBattlefield: ''
    })
  )
})

const state = reactive(initialState())

export const resetState = () => {
  const initState = initialState()
  Object.keys(state).forEach(key => state[key] = initState[key])
}

export const {
  whoGo,
  message,
  isHorizontal,
  currentPlayer,
  isGameOver,
  gameMode,
  playerNumber,
  socket,
  rawShips,
  userSquares,
  enemySquares,
  userScore,
  enemyScore,
  players,
} = toRefs(state)

export const allShipsPlaced = computed(() => state.rawShips.length === 0)
export const allReady = computed(() => state.players.filter(player => !player.isReady).length === 0)
export const sortedPlayers = computed(() => {
  let sPlayers = [...state.players]

  if (state.gameMode === 'multiPlayer' && state.playerNumber === 1) {
    sPlayers = sPlayers.reverse()
  }

  sPlayers[0].whoseBattlefield = `Your battlefield`
  sPlayers[1].whoseBattlefield = `Enemy's battlefield`

  return sPlayers
})
