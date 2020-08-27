<template>
  <div class="container info">
    <div
      class="info__buttons"
      v-if="isGameOver"
    >
      <button
        class="btn"
        @click="startGame"
        :disabled="!allShipsPlaced || !isGameOver"
      >Start Game</button>
      <button
        class="btn"
        v-if="!allShipsPlaced"
        @click="isHorizontal = !isHorizontal"
      >Rotate ships</button>
    </div>
    <p
      class="info__msg"
      v-if="!isGameOver"
    >{{ whoGo }}</p>
    <p class="info__msg">{{ message }}</p>
  </div>
</template>

<script>
import { isGameOver, allShipsPlaced, whoGo, message, isHorizontal } from '@/lib/state'
import { startGame } from '@/lib/game-progress'

export default {
  setup: () => ({
    isGameOver,
    allShipsPlaced,
    startGame,
    whoGo,
    message,
    isHorizontal,
  })
}
</script>
