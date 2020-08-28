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

import { gameMode, roomId } from '@/lib/state'
import { connect, disconnect } from '@/lib/sockets'
import { v4 as uuid } from 'uuid'


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
      roomId.value = root.$route.params.roomId
      if (!roomId.value) {
        roomId.value = uuid()
        root.$router.push({
          name: 'multiPlayer',
          params: { roomId: roomId.value }
        })
      }
      connect()
    } else if (gameMode.value === 'singlePlayer') {
      disconnect()
    }
  }
}
</script>
