<template>
  <main>
    <Header />

    <Battlefields />

    <InfoPanel />

    <UnplacedShips />
  </main>
</template>

<script>
import Header from '@/components/Header'
import UnplacedShips from '@/components/UnplacedShips'
import InfoPanel from '@/components/InfoPanel'
import Battlefields from '@/components/Battlefields'

import { gameMode } from '@/lib/state'
import { connect, disconnect } from '@/lib/sockets'

export default {
  components: {
    Header,
    UnplacedShips,
    InfoPanel,
    Battlefields,
  },
  setup(props, { root }) {
    gameMode.value = root.$route.meta.mode

    if (gameMode.value === 'multiPlayer') {
      connect()
    } else if (gameMode.value === 'singlePlayer') {
      disconnect()
    }
  }
}
</script>
