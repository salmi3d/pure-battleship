<template>
  <div class="container">
    <div
      class="bf-grid"
      @dragover.prevent
      @drop="dragDrop"
    >
      <div
        v-for="square of userSquares"
        :key="square.id"
        :data-id="square.id"
        :class="square.classList"
      />
    </div>

    <div
      class="bf-grid bf-grid_enemy"
      @click="userGo"
    >
      <div
        v-for="square in enemySquares"
        :key="square.id"
        :data-id="square.id"
        :class="square.classList"
      />
    </div>
  </div>
</template>

<script>
import { sortedPlayers, userSquares, enemySquares } from '@/lib/state'
import { dragDrop } from '@/lib/drag-drop-ships'
import { userGo } from '@/lib/game-progress'

export default {
  setup: () => ({
    sortedPlayers,
    userSquares,
    enemySquares,
    dragDrop,
    userGo,
  })
}
</script>
