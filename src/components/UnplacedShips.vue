<template>
  <div class="container">
    <div
      v-if="!allShipsPlaced"
      class="grid-ships"
      @dragstart="dragStart"
      @mousedown="userShipsMouseDown"
    >
      <div
        v-for="type in rawShips"
        :key="type.name"
        :class="[
          'ship',
          `${type.name}-container`,
          !isHorizontal && `${type.name}-container_vertical`
        ]"
        :data-id="`${ type.name }`"
        draggable
      >
        <div
          v-for="index in type.scope"
          :key="index"
          :data-id="`${ type.name }-${ index - 1 }`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { allShipsPlaced, rawShips, isHorizontal } from '@/lib/state'
import { userShipsMouseDown, dragStart } from '@/lib/drag-drop-ships'

export default {
  setup: () => ({
    allShipsPlaced,
    rawShips,
    isHorizontal,
    userShipsMouseDown,
    dragStart,
  })
}
</script>
