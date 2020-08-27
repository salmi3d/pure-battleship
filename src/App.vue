<template>
  <router-view />
</template>

<script>
import { assignSocket, sockets } from '@/lib/sockets'

export default {
  sockets,
  setup(props, { root }) {
    assignSocket(root.$socket)
  }
}
</script>

<style lang="scss">
@import "assets/app.scss";
</style>
