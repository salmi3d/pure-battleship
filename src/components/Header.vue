<template>
  <div class="bf-description">
    <div
      v-for="player in sortedPlayers"
      :key="player.id"
    >
      <div class="bf-description__whose">{{ player.whoseBattlefield }}</div>
      <div v-if="gameMode === 'multiPlayer'">
        <span
          class="bf-description__connected"
          :class="{ 'bf-description__connected_active': player.isConnected }"
        >Connected</span> |
        <span
          class="bf-description__ready"
          :class="{ 'bf-description__ready_active': player.isReady }"
        >Ready</span>
      </div>
    </div>
  </div>
</template>

<script>
import { sortedPlayers, gameMode } from '@/lib/state'

export default {
  setup: () => ({
    sortedPlayers,
    gameMode,
  })
}
</script>
